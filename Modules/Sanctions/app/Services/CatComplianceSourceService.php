<?php

namespace Modules\Sanctions\Services;
use Modules\Sanctions\Repositories\CatComplianceSourceRepository;

class CatComplianceSourceService
{
    public function __construct(protected CatComplianceSourceRepository $repository){}
    public function getAll()
    {
        return $this->repository->getAll();
    }
}
