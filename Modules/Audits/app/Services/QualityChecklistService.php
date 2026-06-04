<?php

namespace Modules\Audits\Services;

use Modules\Audits\Repositories\QualityChecklistRepository;

class QualityChecklistService
{

    public function __construct(protected QualityChecklistRepository $repository) {}

    public function getAll()
    {
        return $this->repository->getAll();
    }

    public function getById($id) {}

    public function create(array $data)
    {
        return $this->repository->create($data);
    }
}
