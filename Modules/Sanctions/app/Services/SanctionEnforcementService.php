<?php

namespace Modules\Sanctions\Services;
use Modules\Sanctions\Repositories\SanctionEnforcementRepository;

class SanctionEnforcementService
{
    public function __construct(protected SanctionEnforcementRepository $repository){}
    public function getAll()
    {
        return $this->repository->getAll();
    }
    public function create($data)
    {
        return $this->repository->create($data);
    }
}