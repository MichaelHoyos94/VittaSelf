<?php

namespace Modules\Sanctions\Services;
Use Modules\Sanctions\Repositories\CatMitigationRepository;

class CatMitigationService
{
    public function __construct(protected CatMitigationRepository $repository){}
    public function getAll()
    {
        return $this->repository->getAll();
    }
}