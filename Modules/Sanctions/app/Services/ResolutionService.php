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
        //#TODO: Crear sanction enforcements relacionados a la resolution creada y con las sanciones seleccionadas TRUE
        $sanctionEnforcementsData = [];
        return $this->repository->create($data);
    }
}
