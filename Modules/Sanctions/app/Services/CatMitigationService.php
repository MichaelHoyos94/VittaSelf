<?php

namespace Modules\Sanctions\Services;
use Modules\Sanctions\Repositories\CatMitigationRepository;

class CatMitigationService
{
    public function __construct(protected CatMitigationRepository $repository){}
    public function getAll()
    {
        return $this->repository->getAll();
    }
}
