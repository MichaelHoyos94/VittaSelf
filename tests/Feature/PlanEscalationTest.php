<?php

use App\Models\CostCenter;
use App\Models\Plan;
use App\Models\Product;
use App\Models\User;
use App\Services\InternalOrderService;
use App\Services\OrderService;
use Illuminate\Support\Facades\DB;

it('adds web order points and upgrades the user plan', function () {
    [$asteroid, $comet] = createPlanEscalationPlans();
    $user = User::factory()->create([
        'points' => 10,
        'plan_id' => $asteroid->id,
    ]);
    createPlanEscalationCart($user);
    $product = Product::factory()->create(['price' => 10000, 'points' => 4]);

    app(OrderService::class)->create([
        'payment_method' => 'cash',
        'shipping_address' => 'Main street',
        'email' => $user->email,
        'phone' => '3001234567',
        'user_id' => $user->id,
        'products' => [
            [
                'id' => $product->id,
                'price' => $product->price,
                'points' => $product->points,
                'pivot' => ['quantity' => 2],
            ],
        ],
    ], $user);

    expect($user->fresh())
        ->points->toBe('18.00')
        ->plan_id->toBe($comet->id);
});

it('adds internal order points and upgrades the user plan', function () {
    [$asteroid, $comet] = createPlanEscalationPlans();
    $costCenter = CostCenter::factory()->create();
    $commercialAgent = User::factory()->create(['cost_center_id' => $costCenter->id]);
    $user = User::factory()->create([
        'points' => 14,
        'plan_id' => $asteroid->id,
    ]);
    $product = Product::factory()->create(['price' => 10000, 'points' => 2]);

    app(InternalOrderService::class)->create([
        'payment_method' => 'cash',
        'shipping_address' => 'Main street',
        'phone' => '3001234567',
        'email' => $user->email,
        'user_id' => $user->id,
        'commercial_agent_id' => $commercialAgent->id,
        'cost_center_id' => $costCenter->id,
        'products' => [
            [
                'id' => $product->id,
                'quantity' => 2,
                'price' => $product->price,
                'points' => $product->points,
            ],
        ],
    ]);

    expect($user->fresh())
        ->points->toBe('18.00')
        ->plan_id->toBe($comet->id);
});

it('does not add points when points are frozen', function () {
    [$asteroid] = createPlanEscalationPlans();
    $user = User::factory()->create([
        'points' => 10,
        'plan_id' => $asteroid->id,
    ]);
    createPlanEscalationCart($user);
    $product = Product::factory()->create(['price' => 10000, 'points' => 10]);
    createPlanEscalationSanction($user, ['FREEZE_POINTS' => true]);

    app(OrderService::class)->create([
        'payment_method' => 'cash',
        'shipping_address' => 'Main street',
        'email' => $user->email,
        'phone' => '3001234567',
        'user_id' => $user->id,
        'products' => [
            [
                'id' => $product->id,
                'price' => $product->price,
                'points' => $product->points,
                'pivot' => ['quantity' => 1],
            ],
        ],
    ], $user);

    expect($user->fresh())
        ->points->toBe('10.00')
        ->plan_id->toBe($asteroid->id);
});

it('adds points without upgrading when plan is frozen', function () {
    [$asteroid] = createPlanEscalationPlans();
    $user = User::factory()->create([
        'points' => 10,
        'plan_id' => $asteroid->id,
    ]);
    createPlanEscalationCart($user);
    $product = Product::factory()->create(['price' => 10000, 'points' => 10]);
    createPlanEscalationSanction($user, ['FREEZE_PLAN' => true]);

    app(OrderService::class)->create([
        'payment_method' => 'cash',
        'shipping_address' => 'Main street',
        'email' => $user->email,
        'phone' => '3001234567',
        'user_id' => $user->id,
        'products' => [
            [
                'id' => $product->id,
                'price' => $product->price,
                'points' => $product->points,
                'pivot' => ['quantity' => 1],
            ],
        ],
    ], $user);

    expect($user->fresh())
        ->points->toBe('20.00')
        ->plan_id->toBe($asteroid->id);
});

function createPlanEscalationPlans(): array
{
    $asteroid = Plan::create([
        'code' => 'ASTEROID',
        'name' => 'Asteroid',
        'logo' => 'asteroid.png',
        'description' => 'Asteroid plan description.',
        'min_points' => 1,
    ]);
    $comet = Plan::create([
        'code' => 'COMET',
        'name' => 'Comet',
        'logo' => 'comet.png',
        'description' => 'Comet plan description.',
        'min_points' => 18,
        'previous_plan_id' => $asteroid->id,
    ]);
    $asteroid->update(['next_plan_id' => $comet->id]);

    return [$asteroid, $comet];
}

function createPlanEscalationCart(User $user): void
{
    DB::table('carts')->insert([
        'user_id' => $user->id,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
}

function createPlanEscalationSanction(User $user, array $sanctions): void
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
