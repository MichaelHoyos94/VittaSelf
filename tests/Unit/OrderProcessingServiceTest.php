<?php

use App\Services\OrderProcessingService;
use App\Services\PlanService;
use App\Services\UserService;
use Modules\Sanctions\Services\SanctionEnforcementService;

afterEach(function () {
    Mockery::close();
});

it('prepares order values from normalized products', function () {
    $service = createOrderProcessingService();

    $data = $service->prepareOrderData(
        ['user_id' => 10, 'products' => ['original products']],
        [
            ['quantity' => 2, 'price' => 10000, 'points' => 4],
            ['quantity' => 1, 'price' => 5000, 'points' => 2],
        ],
        ['freeze_points' => false, 'freeze_plan' => false],
    );

    expect($data)
        ->subtotal->toBe(25000)
        ->shipping_price->toBe(29500)
        ->discount->toBe(0)
        ->shipping_discount->toBe(0)
        ->total->toBe(54500)
        ->points->toBe(10)
        ->products->toBe(['original products']);
});

it('sets order points to zero when points are frozen', function () {
    $service = createOrderProcessingService();

    $data = $service->prepareOrderData(
        ['user_id' => 10],
        [['quantity' => 2, 'price' => 10000, 'points' => 4]],
        ['freeze_points' => true, 'freeze_plan' => false],
    );

    expect($data['points'])->toBe(0);
});

it('combines active sanction restrictions', function () {
    $sanctions = collect([
        (object) [
            'FREEZE_ORDER' => false,
            'BLOCK_ORDERS' => false,
            'FREEZE_POINTS' => true,
            'FREEZE_PLAN' => false,
        ],
        (object) [
            'FREEZE_ORDER' => false,
            'BLOCK_ORDERS' => false,
            'FREEZE_POINTS' => false,
            'FREEZE_PLAN' => true,
        ],
    ]);
    $sanctionService = Mockery::mock(SanctionEnforcementService::class);
    $sanctionService->shouldReceive('getUserSanctions')->once()->with(10)->andReturn($sanctions);
    $service = createOrderProcessingService($sanctionService);

    expect($service->checkRestrictions(10))->toBe([
        'freeze_points' => true,
        'freeze_plan' => true,
    ]);
});

it('blocks an order when an active sanction blocks orders', function () {
    $sanctions = collect([(object) [
        'FREEZE_ORDER' => false,
        'BLOCK_ORDERS' => true,
        'FREEZE_POINTS' => false,
        'FREEZE_PLAN' => false,
    ]]);
    $sanctionService = Mockery::mock(SanctionEnforcementService::class);
    $sanctionService->shouldReceive('getUserSanctions')->once()->andReturn($sanctions);
    $service = createOrderProcessingService($sanctionService);

    expect(fn () => $service->checkRestrictions(10))
        ->toThrow(Exception::class, 'This user is restricted from placing orders due to sanctions.');
});

it('applies plan benefits when the plan is not frozen', function () {
    $plan = (object) ['id' => 5];
    $user = Mockery::mock();
    $user->plan = $plan;
    $user->shouldReceive('load')->once()->with('plan.benefits');
    $userService = Mockery::mock(UserService::class);
    $userService->shouldReceive('getById')->once()->with(10)->andReturn($user);
    $planService = Mockery::mock(PlanService::class);
    $planService->shouldReceive('applyBenefits')
        ->once()
        ->with(['user_id' => 10, 'total' => 100], $plan)
        ->andReturn(['user_id' => 10, 'total' => 90]);
    $service = createOrderProcessingService(null, $userService, $planService);

    $data = $service->applyUserPlanBenefits(
        ['user_id' => 10, 'total' => 100],
        ['freeze_points' => false, 'freeze_plan' => false],
    );

    expect($data['total'])->toBe(90);
});

it('delegates accumulated points with the active restrictions', function () {
    $planService = Mockery::mock(PlanService::class);
    $planService->shouldReceive('applyOrderPoints')
        ->once()
        ->with(10, 8.0, false, true);
    $service = createOrderProcessingService(null, null, $planService);

    $service->applyOrderPoints(
        ['user_id' => 10, 'points' => 8],
        ['freeze_points' => false, 'freeze_plan' => true],
    );
});

function createOrderProcessingService(
    ?SanctionEnforcementService $sanctionService = null,
    ?UserService $userService = null,
    ?PlanService $planService = null,
): OrderProcessingService {
    return new OrderProcessingService(
        $userService ?? Mockery::mock(UserService::class),
        $planService ?? Mockery::mock(PlanService::class),
        $sanctionService ?? Mockery::mock(SanctionEnforcementService::class),
    );
}
