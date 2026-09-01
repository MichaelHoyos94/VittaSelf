<?php

namespace App\Repositories;

use App\Models\Plan;

class PlanRepository
{
    public function __construct() {}

    public function getByPoints(float $points): ?Plan
    {
        return Plan::query()
            ->where('min_points', '<=', $points)
            ->orderByDesc('min_points')
            ->first();
    }
}
