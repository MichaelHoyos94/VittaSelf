<?php

namespace App\Services;

use App\Repositories\PlanRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;

class PlanService
{
    public function __construct(private PlanRepository $repository, private UserRepository $userRepository) {}

    public function applyBenefits($orderData, $plan)
    {
        foreach ($plan->benefits as $benefit) {
            $orderData = match ($benefit->type) {
                'discount' => $this->applyPriceDiscount($orderData, $benefit),
                'shipping_discount' => $this->applyShippingDiscount($orderData, $benefit),
                // 'points_multiplier' => $this->applyPointsMultiplier($orderData, $benefit),
                default => $orderData,
            };
        }
        $orderData['total'] = $orderData['subtotal'] + $orderData['shipping_price'] - $orderData['discount'] - $orderData['shipping_discount'];

        return $orderData;
    }

    public function applyOrderPoints(int $userId, float $points, bool $freezePoints, bool $freezePlan): void
    {
        if ($freezePoints) {
            return;
        }

        DB::transaction(function () use ($userId, $points, $freezePlan) {
            $user = $this->userRepository->getByIdForUpdate($userId);

            if (! $user) {
                return;
            }

            $user->points = (float) $user->points + $points;

            if (! $freezePlan) {
                $plan = $this->repository->getByPoints((float) $user->points);
                $user->plan_id = $plan?->id;
            }

            $user->save();
        });
    }

    private function applyPriceDiscount($orderData, $benefit)
    {
        $mode = $benefit->config['mode'] ?? 'percentage';
        if ($mode === 'percentage') {
            $discount = $orderData['subtotal'] * ($benefit->value / 100);
        } else {
            $discount = $benefit->value;
        }
        $orderData['discount'] = $discount;

        return $orderData;
    }

    private function applyShippingDiscount($orderData, $benefit)
    {
        $mode = $benefit->config['mode'] ?? 'percentage';
        if ($mode === 'percentage') {
            $shipping_discount = $orderData['shipping_price'] * ($benefit->value / 100);
        } else {
            $shipping_discount = $benefit->value;
        }
        $orderData['shipping_discount'] = $shipping_discount;

        return $orderData;
    }

    private function applyPointsMultiplier($orderData, $benefit) {}
}
