<?php

namespace App\Services;

use App\Repositories\InternalOrderRepository;
use Exception;
use Modules\Sanctions\Services\SanctionEnforcementService;

class InternalOrderService
{
    public function __construct(
        private InternalOrderRepository $internalOrderRepository,
        private UserService $userService,
        private PlanService $planService,
        private SanctionEnforcementService $sanctionEnforcementService,
    ) {}

    public function getAll() {
        return $this->internalOrderRepository->getAll();
    }

    public function create($data)
    {
        $restrictions = $this->checkRestrictions($data['user_id']);
        $data = $this->prepareOrderData($data, $restrictions);
        $data = $this->applyUserPlanBenefits($data, $restrictions);
        return $this->persistOrder($data);
    }

    private function prepareOrderData($data, $restrictions)
    {
        $data['subtotal'] = $this->calculateSubtotal($data['products']);
        $data['shipping_price'] = $this->calculateShipping();
        $data['discount'] = 0;
        $data['shipping_discount'] = 0;
        $data['total'] = $data['subtotal'] + $data['shipping_price'];
        $data['points'] = $this->calculatePoints($data['products'], $restrictions);

        return $data;
    }

    private function applyUserPlanBenefits($data, $restrictions)
    {
        $user = $this->userService->getById($data['user_id']);
        $user->load('plan.benefits');

        if ($user->plan && !$restrictions['freeze_plan']) {
            return $this->planService->applyBenefits($data, $user->plan);
        }
        return $data;
    }

    private function persistOrder($data)
    {
        return $this->internalOrderRepository->create($data);
    }

    private function calculateSubtotal($products)
    {
        $subtotal = 0;
        foreach ($products as $product) {
            $subtotal += $product['quantity'] * $product['price'];
        }
        return $subtotal;
    }

    private function calculateShipping()
    {
        return 29500;
    }

    private function calculatePoints($products, $restrictions)
    {
        if ($restrictions['freeze_points']) return 0;
        $points = 0;
        foreach ($products as $product) {
            $points += $product['quantity'] * $product['points'];
        }
        return $points;
    }

    private function checkRestrictions($userId)
    {
        $sanctions = $this->sanctionEnforcementService->getUserSanctions($userId);
        $restrictions = [
            'freeze_points' => false,
            'freeze_plan' => false,
        ];
        foreach ($sanctions as $sanction) {
            if (($sanction->FREEZE_ORDER ?? false) || ($sanction->BLOCK_ORDERS ?? false))
                throw new Exception("This user is restricted from placing orders due to sanctions.");
            if ($sanction->FREEZE_POINTS) $restrictions['freeze_points'] = true;
            if ($sanction->FREEZE_PLAN) $restrictions['freeze_plan'] = true;
        }
        return $restrictions;
    }
}
