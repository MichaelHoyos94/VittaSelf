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
                'productCountAudits' => $this->repository->getProductCountAuditsCount(),
                'qualityChecklistAudits' => $this->repository->getQualityChecklistAuditsCount(),
                'cashRegisterClosureAudits' => $this->repository->getCashRegisterClosureAuditsCount(),
            ],
            'usersByRoles' => $this->repository->usersByRole(),
            'usersRegisteredByMonth' => $this->repository->getEuisRegisteredByMount(),
            'euisByPlan' => $this->repository->getEuisByPlanCount(),
            'webOrdersMonthly' => $this->repository->getMonthlyWebOrdersCount(),
            'internalOrdersMonthly' => $this->repository->getMonthlyInternalOrdersCount(),
            'disciplinaryCasesByPolicy' => $this->repository->getDisciplinaryCasesByPolicy(),
            'disciplinaryCasesByUser' => $this->repository->getDisciplinaryCasesByUser(),
            'productCountsAuditsByStatus' => $this->repository->getProductCountAuditsByStatus(),
            'cashRegisterClosureAuditsByStatus' => $this->repository->getCashRegisterClosureAuditsByStatus(),
            'qualityChecklistAuditsByStatus' => $this->repository->getQualityChecklistAuditsByStatus(),
        ];
    }
}
