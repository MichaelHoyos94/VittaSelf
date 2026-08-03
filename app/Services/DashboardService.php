<?php

namespace App\Services;

use App\Repositories\DashboardRepository;

class DashboardService
{
    public function __construct(private DashboardRepository $repository) {}
    
    public function getData()
    {
        $euis = $this->repository->getEuisCount();
        $usersByRole = $this->repository->usersByRole();
        $monthlyOrders = $this->repository->getMonthlyWebOrdersCount();
        $currentMonthOrders = $this->repository->getCurrentMonthWebOrdersCount();
        return [
            'metrics' => [
                'euis' => $this->repository->getEuisCount(),
                'euisCreatedThisMonth' => $this->repository->getEuisRegisteredThisMountCount(),
                'euisCreatedThisYear' => $this->repository->getEuisRegisteredThisYearCount(),
            ],
            'usersByRoles' => $this->repository->usersByRole(),
        ];
    }
}