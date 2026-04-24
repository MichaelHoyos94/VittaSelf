<?php

namespace Modules\Sanctions\Services;

use Modules\Sanctions\Repositories\ResolutionRepository;

class ResolutionService
{
    public function __construct(protected ResolutionRepository $repository) {}
    public function getAll()
    {
        return $this->repository->getAll();
    }
    public function create($data)
    {
        //#TODO: Validaciones de negocio
        return $this->repository->create($data);
    }
}
