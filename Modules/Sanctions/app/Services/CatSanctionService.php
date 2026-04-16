<?php

namespace Modules\Sanctions\Services;
use Modules\Sanctions\Repositories\CatSanctionRepository;
class CatSanctionService
{
    public function __construct(protected CatSanctionRepository $repository){}
    public function getAll()
    {
        return $this->repository->getAll();
    }
}