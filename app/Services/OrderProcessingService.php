<?php

namespace App\Services;

use Exception;
use Modules\Sanctions\Services\SanctionEnforcementService;

class OrderProcessingService
{
    private const SHIPPING_PRICE = 29500;

    public function __construct(
        private UserService $userService,
        private PlanService $planService,
        private SanctionEnforcementService $sanctionEnforcementService,
    ) {}

    public function checkRestrictions($userId): array
    {
        $sanctions = $this->sanctionEnforcementService->getUserSanctions($userId);
        $restrictions = [
            'freeze_points' => false,
            'freeze_plan' => false,
        ];

        foreach ($sanctions as $sanction) {
            if (($sanction->FREEZE_ORDER ?? false) || ($sanction->BLOCK_ORDERS ?? false)) {
                throw new Exception('This user is restricted from placing orders due to sanctions.');
            }

            if ($sanction->FREEZE_POINTS) {
                $restrictions['freeze_points'] = true;
            }

            if ($sanction->FREEZE_PLAN) {
                $restrictions['freeze_plan'] = true;
            }
        }

        return $restrictions;
    }

    public function prepareOrderData(array $data, array $products, array $restrictions): array
    {
        $data['subtotal'] = $this->calculateSubtotal($products);
        $data['shipping_price'] = self::SHIPPING_PRICE;
        $data['discount'] = 0;
        $data['shipping_discount'] = 0;
        $data['total'] = $data['subtotal'] + $data['shipping_price'];
        $data['points'] = $restrictions['freeze_points']
            ? 0
            : $this->calculatePoints($products);

        return $data;
    }

    public function applyUserPlanBenefits(array $data, array $restrictions): array
    {
        $user = $this->userService->getById($data['user_id']);
        $user->load('plan.benefits');

        if ($user->plan && ! $restrictions['freeze_plan']) {
            return $this->planService->applyBenefits($data, $user->plan);
        }

        return $data;
    }

    public function applyOrderPoints(array $data, array $restrictions): void
    {
        $this->planService->applyOrderPoints(
            $data['user_id'],
            (float) $data['points'],
            $restrictions['freeze_points'],
            $restrictions['freeze_plan'],
        );
    }

    private function calculateSubtotal(array $products): float|int
    {
        return array_reduce(
            $products,
            fn ($subtotal, $product) => $subtotal + ($product['quantity'] * $product['price']),
            0,
        );
    }

    private function calculatePoints(array $products): float|int
    {
        return array_reduce(
            $products,
            fn ($points, $product) => $points + ($product['quantity'] * $product['points']),
            0,
        );
    }
}
