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

    public function getFirst(): ?Plan
    {
        return Plan::query()
            ->orderBy('min_points')
            ->first(['id', 'name', 'min_points']);
    }
}
