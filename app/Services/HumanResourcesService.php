<?php

namespace App\Services;

use App\Repositories\HumanResourcesRepository;

class HumanResourcesService
{
    public function __construct(private HumanResourcesRepository $repository) {}
    public function getAll($search)
    {
        return $this->repository->getAll($search);
    }
}
