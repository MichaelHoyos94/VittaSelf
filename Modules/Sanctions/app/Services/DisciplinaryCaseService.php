<?php

namespace Modules\Sanctions\Services;
use Modules\Sanctions\Repositories\DisciplinaryCaseRepository;

class DisciplinaryCaseService
{
    public function __construct(protected DisciplinaryCaseRepository $repository){}
    public function getAll()
    {
        return $this->repository->getAll();
    }
}