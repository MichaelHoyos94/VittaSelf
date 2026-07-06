<?php

namespace App\Services;

use App\Repositories\OrderRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use Modules\Sanctions\Services\SanctionEnforcementService;

class OrderService
{
    public function __construct(private OrderRepository $repository, private CartService $cartService, private SanctionEnforcementService $sanctionEnforcementService, private PlanService $planService) {}
    public function create($data, $user)
    {
        $sanctions = $this->sanctionEnforcementService->getUserSanctions($data['user_id']);
        $freezePlan = false;
        $freezePoints = false;
        if ($sanctions->isNotEmpty()) {
            foreach ($sanctions as $sanction) {
                if ($sanction->BLOCK_ORDERS === true) {
                    throw new Exception('User is restricted from placing orders due to sanctions.');
                } if ($sanction->FREEZE_PLAN === true) {
                    $freezePlan = true;
                } if ($sanction->FREEZE_POINTS === true) {
                    $freezePoints = true;
                }
            }
        }
        $data['subtotal'] = $this->calculateSubtotal($data['products']);
        $data['shipping_price'] = $this->calculateShipping();
        $data['discount'] = 0;
        $data['shipping_discount'] = 0;
        $data['total'] = $data['subtotal'] + $data['shipping_price'];
        $data['points'] = $freezePoints ? 0 : $this->calculatePoints($data['products']);
        $user->load('plan.benefits');
        if ($user->plan && !$freezePlan) {
            $data = $this->planService->applyBenefits($data, $user->plan);
        }
        dd($data);
        $order = $this->repository->create($data);
        if ($order) {
            $this->cartService->emptyCart($data['user_id']);
        }
        return $order;
    }
    public function getByUserId($userId)
    {
        return $this->repository->getByUserId($userId);
    }
    private function calculateSubtotal($products)
    {
        $subtotal = 0;
        foreach ($products as $product) {
            $subtotal += $product['pivot']['quantity'] * $product['price'];
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
            $points += $product['pivot']['quantity'] * $product['points'];
        }
        return $points;
    }
}
