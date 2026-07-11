<?php

namespace App\Services;

use App\Repositories\InternalOrderRepository;

class InternalOrderService
{
    public function __construct(
        private InternalOrderRepository $internalOrderRepository,
        private UserService $userService,
        private PlanService $planService
    ) {}
    public function create($data)
    {
        $data = $this->prepareOrderData($data);
        $data = $this->applyUserPlanBenefits($data);
        dd($data);
        return $this->persistOrder($data);
    }

    private function prepareOrderData($data)
    {
        $data['subtotal'] = $this->calculateSubtotal($data['products']);
        $data['shipping_price'] = $this->calculateShipping();
        $data['discount'] = 0;
        $data['shipping_discount'] = 0;
        $data['total'] = $data['subtotal'] + $data['shipping_price'];
        $data['points'] = $this->calculatePoints($data['products']);

        return $data;
    }

    private function applyUserPlanBenefits($data)
    {
        $user = $this->userService->getById($data['user_id']);
        $user->load('plan.benefits');

        if ($user->plan) {
            return $this->planService->applyBenefits($data, $user->plan);
        }

        return $data;
    }

    private function persistOrder($data)
    {
        unset($data['products'], $data['shipping_price'], $data['shipping_discount']);

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

    private function calculatePoints($products)
    {
        $points = 0;
        foreach ($products as $product) {
            $points += $product['quantity'] * $product['points'];
        }
        return $points;
    }

    public function getAll() {}
}
