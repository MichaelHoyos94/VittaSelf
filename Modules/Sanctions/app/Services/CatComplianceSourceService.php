<?php

namespace Modules\Sanctions\Services;
Use Modules\Sanctions\Repositories\CatComplianceSourceRepository;

class CatComplianceSourceService
{
    public function __construct(protected CatComplianceSourceRepository $repository){}
    public function getAll()
    {
        return $this->repository->getAll();
    }
}