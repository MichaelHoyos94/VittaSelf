<?php

namespace App\Services;

use App\Repositories\DashboardRepository;

class DashboardService
{
    public function __construct(private DashboardRepository $repository) {}
    
    public function getData()
    {
        return [
            'metrics' => [
                'euis' => $this->repository->getEuisCount(),
                'euisCreatedThisMonth' => $this->repository->getEuisRegisteredThisMountCount(),
                'euisCreatedThisYear' => $this->repository->getEuisRegisteredThisYearCount(),
                'euisByPlan' => $this->repository->getEuisByPlanCount(),
                'monthlyOrders' => $this->repository->getMonthlyWebOrdersCount(),
            ],
            'usersByRoles' => $this->repository->usersByRole(),
        ];
    }
}