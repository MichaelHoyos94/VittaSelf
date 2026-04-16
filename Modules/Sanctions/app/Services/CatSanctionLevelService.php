<?php

namespace Modules\Sanctions\Services;
use Modules\Sanctions\Repositories\CatSanctionLevelRepository;
class CatSanctionLevelService
{
    public function __construct(protected CatSanctionLevelRepository $repository){}
    public function getAll()
    {
        return $this->repository->getAll();
    }
}
