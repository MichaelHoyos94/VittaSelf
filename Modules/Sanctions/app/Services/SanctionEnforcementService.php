<?php

namespace Modules\Sanctions\Services;

use Modules\Sanctions\Models\SanctionEnforcement;
use Modules\Sanctions\Repositories\SanctionEnforcementRepository;

class SanctionEnforcementService
{
    public function __construct(protected SanctionEnforcementRepository $repository) {}

    public function getAll()
    {
        return $this->repository->getAll();
    }

    public function create($data)
    {
        return $this->repository->create($data);
    }

    public function getUserSanctions($userId)
    {
        return $this->repository->getUserSanctions($userId);
    }

    public function getStatus(SanctionEnforcement $enforcement): string
    {
        $now = now();

        if ($enforcement->lifted_at !== null && $enforcement->lifted_at->lte($now)) {
            return 'expired';
        }

        if ($enforcement->applied_at->gt($now)) {
            return 'scheduled';
        }

        return 'active';
    }
}
