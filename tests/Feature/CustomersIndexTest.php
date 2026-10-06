<?php

use App\Enums\RoleName;
use App\Models\Plan;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate([
        'name' => RoleName::EUI->value,
        'guard_name' => 'web',
    ]);

    $this->asteroid = Plan::create([
        'code' => 'ASTEROID',
        'name' => 'Asteroid',
        'logo' => 'asteroid.png',
        'description' => 'Asteroid plan description.',
        'min_points' => 1,
    ]);
    $this->comet = Plan::create([
        'code' => 'COMET',
        'name' => 'Comet',
        'logo' => 'comet.png',
        'description' => 'Comet plan description.',
        'min_points' => 18,
        'previous_plan_id' => $this->asteroid->id,
    ]);
    $this->asteroid->update(['next_plan_id' => $this->comet->id]);

    $this->admin = User::factory()->create();
});

it('includes the next plan for each customer', function (string $euiCode, int $points, ?string $plan, ?string $nextPlan) {
    $planId = $plan ? Plan::where('code', $plan)->value('id') : null;
    $eui = User::factory()->create([
        'eui_code' => $euiCode,
        'points' => $points,
        'plan_id' => $planId,
    ]);
    $eui->assignRole(RoleName::EUI->value);

    $this->actingAs($this->admin)
        ->get(route('customers.index', ['search' => $euiCode]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Customers/Index')
            ->has('users.data', 1)
            ->where('users.data.0.points', number_format($points, 2, '.', ''))
            ->when(
                $nextPlan === null,
                fn (Assert $page) => $page->where('users.data.0.next_plan', null),
                fn (Assert $page) => $page->where('users.data.0.next_plan.name', $nextPlan),
            )
        );
})->with([
    'without plan' => ['col00001', 0, null, 'Asteroid'],
    'intermediate plan' => ['col00002', 5, 'ASTEROID', 'Comet'],
    'max plan' => ['col00003', 20, 'COMET', null],
]);
