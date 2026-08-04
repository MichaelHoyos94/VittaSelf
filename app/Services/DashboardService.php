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
                'employees' => $this->repository->getEmployeesCount(),
                'monthlyOrders' => $this->repository->getMonthlyWebOrdersCount(),
                'WebOrders' => $this->repository->getCurrentYearWebOrdersCount(),
                'internalOrders' => $this->repository->getCurrentYearInternalOrders(),
                'webOrders' => $this->repository->getCurrentYearWebOrdersCount(),
                'disciplinaryCases' => $this->repository->getDisciplinaryCasesCount(),
                'disciplinaryCasesUnassigned' => $this->repository->getDisciplinaryCasesUnassignedCount(),
                'disciplinaryCasesOpen' => $this->repository->getDisciplinaryCasesOpenCount(),
                'disciplinaryCasesAwaitingEvidences' => $this->repository->getDisciplinaryCasesAwaitingEvidencesCount(),
                'disciplinaryCasesOnResolution' => $this->repository->getDisciplinaryCasesOnResolutionCount(),
                'disciplinaryCasesClosed' => $this->repository->getDisciplinaryCasesClosedCount(),
            ],
            'usersByRoles' => $this->repository->usersByRole(),
            'usersRegisteredByMonth' => $this->repository->getEuisRegisteredByMount(),
            'euisByPlan' => $this->repository->getEuisByPlanCount(),
            'webOrdersMonthly' => $this->repository->getMonthlyWebOrdersCount(),
        ];
    }
}
