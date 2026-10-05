<?php

use App\Models\Plan;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Modules\Sanctions\Database\Seeders\SanctionsDatabaseSeeder;
use Modules\Sanctions\Enums\ResolutionType;
use Modules\Sanctions\Models\CatCaseStatus;
use Modules\Sanctions\Models\CatComplianceSource;
use Modules\Sanctions\Models\CatMitigation;
use Modules\Sanctions\Models\CatPolicy;
use Modules\Sanctions\Models\CatSanction;
use Modules\Sanctions\Models\CatSanctionLevel;
use Modules\Sanctions\Models\DisciplinaryCase;
use Modules\Sanctions\Models\Resolution;
use Modules\Sanctions\Models\SanctionEnforcement;

beforeEach(function () {
    $this->seed(SanctionsDatabaseSeeder::class);
    $this->admin = User::factory()->create();
});

it('includes the resolution details needed by the details modal', function () {
    $plan = Plan::create([
        'code' => 'ASTEROID',
        'name' => 'Asteroid',
        'logo' => 'asteroid.png',
        'description' => 'Asteroid plan description.',
        'min_points' => 1,
    ]);
    $eui = User::factory()->create(['plan_id' => $plan->id]);

    createHistoryResolution($eui, $this->admin, [
        'sanctions' => ['FREEZE_PLAN', 'FREEZE_POINTS'],
        'mitigations' => ['FIRST_INFRACTION'],
        'applied_at' => now()->subDay(),
        'lifted_at' => null,
    ]);

    $this->actingAs($this->admin)
        ->get(route('sanctions.resolutions.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Sanctions/Resolutions/Index', false)
            ->has('resolutions.data', 1)
            ->where('resolutions.data.0.disciplinary_case.user.id', $eui->id)
            ->where('resolutions.data.0.disciplinary_case.user.plan.name', 'Asteroid')
            ->where('resolutions.data.0.disciplinary_case.admin.id', $this->admin->id)
            ->where('resolutions.data.0.disciplinary_case.policy.code', 'EUI_NETWORK_SUSTRACTION')
            ->where('resolutions.data.0.disciplinary_case.compliance_source.code', 'SOCIAL_MEDIA')
            ->where('resolutions.data.0.sanction_level.code', 'SERIOUS')
            ->has('resolutions.data.0.sanctions', 2)
            ->has('resolutions.data.0.mitigations', 1)
            ->where('resolutions.data.0.mitigations.0.code', 'FIRST_INFRACTION')
            ->where('resolutions.data.0.enforcement_status', 'active')
        );
});

it('derives the enforcement status of each resolution', function () {
    $eui = User::factory()->create();

    createHistoryResolution($eui, $this->admin, [
        'applied_at' => now()->subMonth(),
        'lifted_at' => now()->subDay(),
        'minutes_ago' => 1,
    ]);
    createHistoryResolution($eui, $this->admin, [
        'applied_at' => now()->addDay(),
        'lifted_at' => now()->addMonth(),
        'minutes_ago' => 2,
    ]);
    createHistoryResolution($eui, $this->admin, [
        'applied_at' => now()->subDay(),
        'lifted_at' => now()->addMonth(),
        'minutes_ago' => 3,
    ]);
    createHistoryResolution($eui, $this->admin, [
        'type' => ResolutionType::NOT_PROCEDE,
        'applied_at' => now()->subDay(),
        'lifted_at' => null,
        'minutes_ago' => 4,
    ]);
    createHistoryResolution($eui, $this->admin, [
        'with_enforcement' => false,
        'minutes_ago' => 5,
    ]);

    $this->actingAs($this->admin)
        ->get(route('sanctions.resolutions.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('resolutions.data', 5)
            ->where('resolutions.data.0.enforcement_status', 'expired')
            ->where('resolutions.data.1.enforcement_status', 'scheduled')
            ->where('resolutions.data.2.enforcement_status', 'active')
            ->where('resolutions.data.3.enforcement_status', 'none')
            ->where('resolutions.data.4.enforcement_status', 'none')
        );
});

function createHistoryResolution(User $eui, User $admin, array $options = []): Resolution
{
    $case = DisciplinaryCase::create([
        'facts_description' => 'The EUI recruited members from another network.',
        'user_id' => $eui->id,
        'admin_id' => $admin->id,
        'policy_id' => CatPolicy::where('code', 'EUI_NETWORK_SUSTRACTION')->value('id'),
        'compliance_source_id' => CatComplianceSource::where('code', 'SOCIAL_MEDIA')->value('id'),
        'case_status_id' => CatCaseStatus::where('code', 'CLOSED')->value('id'),
    ]);

    $resolution = Resolution::create([
        'resolution_type' => $options['type'] ?? ResolutionType::PROCEDE,
        'resolution_text' => 'The facts were confirmed by the evidences.',
        'disciplinary_case_id' => $case->id,
        'sanction_level_id' => CatSanctionLevel::where('code', 'SERIOUS')->value('id'),
    ]);
    $resolution->forceFill(['created_at' => now()->subMinutes($options['minutes_ago'] ?? 0)])->save();

    $resolution->sanctions()->sync(
        CatSanction::whereIn('code', $options['sanctions'] ?? ['FREEZE_PLAN'])->pluck('id')
    );
    $resolution->mitigations()->sync(
        CatMitigation::whereIn('code', $options['mitigations'] ?? [])->pluck('id')
    );

    if ($options['with_enforcement'] ?? true) {
        SanctionEnforcement::create([
            'user_id' => $eui->id,
            'resolution_id' => $resolution->id,
            'FREEZE_PLAN' => true,
            'applied_at' => $options['applied_at'],
            'lifted_at' => $options['lifted_at'],
        ]);
    }

    return $resolution;
}
