<?php

namespace Modules\Sanctions\Services;

use Modules\Sanctions\Repositories\ResolutionRepository;

class ResolutionService
{
    public function __construct(
        protected ResolutionRepository $repository,
        protected SanctionEnforcementService $sanctionEnforcementService,
        protected DisciplinaryCaseService $disciplinaryCaseService
    ) {}
    public function getAll()
    {
        return $this->repository->getAll();
    }
    public function create($data)
    {
        $appliedAt = $data['applied_at'];
        $liftedAt = $data['lifted_at'];
        unset($data['applied_at'], $data['lifted_at']);
        $resolution = $this->repository->create($data);
        if ($resolution) {
            $this->disciplinaryCaseService->progressCase($resolution->disciplinary_case_id);
            $sanctionEnforcementData = [
                'user_id' => $resolution->disciplinaryCase->user_id,
                'resolution_id' => $resolution->id,
                'SUSPEND_ACCOUNT' => $resolution->sanctions->contains('code', 'SUSPEND_ACCOUNT'),
                'FREEZE_PLAN' => $resolution->sanctions->contains('code', 'FREEZE_PLAN'),
                'FREEZE_BONUSES' => $resolution->sanctions->contains('code', 'FREEZE_BONUSES'),
                'FREEZE_POINTS' => $resolution->sanctions->contains('code', 'FREEZE_POINTS'),
                'SUSPEND_CODE' => $resolution->sanctions->contains('code', 'SUSPEND_CODE'),
                'DOWNGRADE_PLAN' => $resolution->sanctions->contains('code', 'DOWNGRADE_PLAN'),
                'TERMINATE_ACCOUNT' => $resolution->sanctions->contains('code', 'TERMINATE_ACCOUNT'),
                'BLOCK_ORDERS' => $resolution->sanctions->contains('code', 'BLOCK_ORDERS'),
                'applied_at' => $appliedAt,
                'lifted_at' => $liftedAt,
            ];
            $this->sanctionEnforcementService->create($sanctionEnforcementData);
        }
        return $resolution->load(['sanctionEnforcements']);
    }
}
