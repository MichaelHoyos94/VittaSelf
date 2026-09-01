<?php

use App\Enums\RoleName;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate([
        'name' => RoleName::EUI->value,
        'guard_name' => 'web',
    ]);
});

it('creates an eui with an existing representative', function () {
    $admin = User::factory()->create();
    $representative = User::factory()->create(['eui_code' => 'col00001']);
    $representative->assignRole(RoleName::EUI->value);

    $this->actingAs($admin)
        ->post(route('customers.store'), [
            'name' => 'Carlos',
            'last_name' => 'Perez',
            'document_number' => '100200300',
            'email' => 'carlos@example.com',
            'phone' => '3001234567',
            'address' => 'Main street',
            'password' => 'password',
            'password_confirmation' => 'password',
            'representative_eui_code' => 'col00001',
        ])
        ->assertRedirect(route('customers.index'))
        ->assertSessionHas('success');

    $this->assertDatabaseHas('users', [
        'email' => 'carlos@example.com',
        'representative_id' => $representative->id,
    ]);
});

it('rejects a missing representative', function () {
    $admin = User::factory()->create();

    $this->actingAs($admin)
        ->post(route('customers.store'), [
            'name' => 'Ana',
            'last_name' => 'Gomez',
            'document_number' => '100200301',
            'email' => 'ana@example.com',
            'phone' => '3001234568',
            'address' => 'Main street',
            'password' => 'password',
            'password_confirmation' => 'password',
            'representative_eui_code' => 'col99999',
        ])
        ->assertSessionHasErrors('representative_eui_code');

    $this->assertDatabaseMissing('users', [
        'email' => 'ana@example.com',
    ]);
});

it('rejects a representative with an active suspended account sanction', function () {
    $admin = User::factory()->create();
    $representative = User::factory()->create(['eui_code' => 'col00001']);
    $representative->assignRole(RoleName::EUI->value);
    createSanctionEnforcement($representative, ['SUSPEND_ACCOUNT' => true]);

    $this->actingAs($admin)
        ->post(route('customers.store'), [
            'name' => 'Ana',
            'last_name' => 'Gomez',
            'document_number' => '100200302',
            'email' => 'ana.suspended@example.com',
            'phone' => '3001234568',
            'address' => 'Main street',
            'password' => 'password',
            'password_confirmation' => 'password',
            'representative_eui_code' => 'col00001',
        ])
        ->assertRedirect(route('customers.index'))
        ->assertSessionHas('error', 'The representative has an active sanction and cannot add entrepreneurs to their network.');

    $this->assertDatabaseMissing('users', [
        'email' => 'ana.suspended@example.com',
    ]);
});

it('rejects a representative with an active suspended code sanction', function () {
    $admin = User::factory()->create();
    $representative = User::factory()->create(['eui_code' => 'col00001']);
    $representative->assignRole(RoleName::EUI->value);
    createSanctionEnforcement($representative, ['SUSPEND_CODE' => true]);

    $this->actingAs($admin)
        ->post(route('customers.store'), [
            'name' => 'Luis',
            'last_name' => 'Gomez',
            'document_number' => '100200303',
            'email' => 'luis.suspended@example.com',
            'phone' => '3001234569',
            'address' => 'Main street',
            'password' => 'password',
            'password_confirmation' => 'password',
            'representative_eui_code' => 'col00001',
        ])
        ->assertRedirect(route('customers.index'))
        ->assertSessionHas('error', 'The representative has an active sanction and cannot add entrepreneurs to their network.');

    $this->assertDatabaseMissing('users', [
        'email' => 'luis.suspended@example.com',
    ]);
});

it('renders euis with representative data and represented count', function () {
    $admin = User::factory()->create();
    $representative = User::factory()->create([
        'name' => 'Laura',
        'last_name' => 'Diaz',
        'eui_code' => 'col00001',
    ]);
    $represented = User::factory()->create([
        'name' => 'Mario',
        'eui_code' => 'col00002',
        'representative_id' => $representative->id,
    ]);

    $representative->assignRole(RoleName::EUI->value);
    $represented->assignRole(RoleName::EUI->value);

    $this->actingAs($admin)
        ->get(route('customers.index', ['search' => 'col00001']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Customers/Index')
            ->has('users.data', 1)
            ->where('users.data.0.represented_users_count', 1)
        );

    $this->actingAs($admin)
        ->get(route('customers.index', ['search' => 'col00002']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Customers/Index')
            ->has('users.data', 1)
            ->where('users.data.0.representative.eui_code', 'col00001')
        );
});

it('previews an available representative by eui code', function () {
    $admin = User::factory()->create();
    $representative = User::factory()->create([
        'name' => 'Laura',
        'eui_code' => 'col00001',
    ]);
    $representative->assignRole(RoleName::EUI->value);

    $this->actingAs($admin)
        ->get(route('customers.index', ['representative_eui_code' => 'col00001']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Customers/Index')
            ->where('representativeCandidate.user.eui_code', 'col00001')
            ->where('representativeCandidate.is_available', true)
        );
});

it('previews a sanctioned representative as unavailable', function () {
    $admin = User::factory()->create();
    $representative = User::factory()->create(['eui_code' => 'col00001']);
    $representative->assignRole(RoleName::EUI->value);
    createSanctionEnforcement($representative, ['SUSPEND_CODE' => true]);

    $this->actingAs($admin)
        ->get(route('customers.index', ['representative_eui_code' => 'col00001']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Customers/Index')
            ->where('representativeCandidate.user.eui_code', 'col00001')
            ->where('representativeCandidate.is_available', false)
            ->where('representativeCandidate.message', 'This EUI has an active sanction and cannot add entrepreneurs to their network.')
        );
});

it('previews an inactive representative as unavailable', function () {
    $admin = User::factory()->create();
    $representative = User::factory()->create(['eui_code' => 'col00001']);
    $representative->assignRole(RoleName::EUI->value);
    $representative->delete();

    $this->actingAs($admin)
        ->get(route('customers.index', ['representative_eui_code' => 'col00001']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Customers/Index')
            ->where('representativeCandidate.user.eui_code', 'col00001')
            ->where('representativeCandidate.is_available', false)
            ->where('representativeCandidate.message', 'This EUI is inactive and cannot add entrepreneurs to their network.')
        );
});

it('shows only direct referrals for the authenticated eui', function () {
    $representative = User::factory()->create(['eui_code' => 'col00001']);
    $directReferral = User::factory()->create([
        'name' => 'Direct',
        'eui_code' => 'col00002',
        'representative_id' => $representative->id,
    ]);
    $indirectReferral = User::factory()->create([
        'name' => 'Indirect',
        'eui_code' => 'col00003',
        'representative_id' => $directReferral->id,
    ]);

    $representative->assignRole(RoleName::EUI->value);
    $directReferral->assignRole(RoleName::EUI->value);
    $indirectReferral->assignRole(RoleName::EUI->value);

    $this->actingAs($representative)
        ->get(route('my-referrals'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Customers/MyReferrals')
            ->has('representedUsers.data', 1)
            ->where('representedUsers.data.0.eui_code', 'col00002')
        );
});

function createSanctionEnforcement(User $user, array $sanctions): void
{
    $policyId = DB::table('cat_policies')->insertGetId([
        'code' => 'POLICY-'.uniqid(),
        'policy' => 'Policy '.uniqid(),
        'section' => '1.1',
        'numeral' => '1.1.1',
        'description' => 'Test policy',
        'active' => true,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    $sourceId = DB::table('cat_compliance_sources')->insertGetId([
        'code' => 'SOURCE-'.uniqid(),
        'source' => 'Source '.uniqid(),
        'description' => 'Test source',
        'active' => true,
    ]);
    $statusId = DB::table('cat_case_statuses')->insertGetId([
        'code' => 'OPEN-'.uniqid(),
        'case_status' => 'Open '.uniqid(),
        'case_status_description' => 'Open case',
    ]);
    $levelId = DB::table('cat_sanctions_level')->insertGetId([
        'code' => 'LEVEL-'.uniqid(),
        'sanction_level' => 'Level '.uniqid(),
        'sanction_level_description' => 'Test level',
    ]);
    $caseId = DB::table('disciplinary_cases')->insertGetId([
        'facts_description' => 'Test facts',
        'details' => 'Test details',
        'user_id' => $user->id,
        'admin_id' => null,
        'policy_id' => $policyId,
        'compliance_source_id' => $sourceId,
        'case_status_id' => $statusId,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    $resolutionId = DB::table('resolution')->insertGetId([
        'resolution_type' => 'PROCEDE',
        'resolution_text' => 'Test resolution',
        'disciplinary_case_id' => $caseId,
        'sanction_level_id' => $levelId,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    DB::table('sanction_enforcements')->insert(array_merge([
        'SUSPEND_ACCOUNT' => false,
        'FREEZE_PLAN' => false,
        'FREEZE_BONUSES' => false,
        'FREEZE_POINTS' => false,
        'SUSPEND_CODE' => false,
        'DOWNGRADE_PLAN' => false,
        'TERMINATE_ACCOUNT' => false,
        'BLOCK_ORDERS' => false,
        'applied_at' => now()->subDay(),
        'lifted_at' => null,
        'resolution_id' => $resolutionId,
        'user_id' => $user->id,
        'created_at' => now(),
        'updated_at' => now(),
    ], $sanctions));
}
