<?php

namespace Modules\Sanctions\Services;

use Modules\Sanctions\Repositories\CatCaseStatusRepository;
use Modules\Sanctions\Repositories\DisciplinaryCaseRepository;

class DisciplinaryCaseService
{
    public function __construct(
        protected DisciplinaryCaseRepository $repository,
        protected CatCaseStatusRepository $caseStatusRepository
    ) {}
    public function getAll()
    {
        return $this->repository->getAll();
    }
    public function create(array $data)
    {
        $data['case_status_id'] = 1; // Set default case status to "Open"
        return $this->repository->create($data);
    }
    public function getById($id)
    {
        return $this->repository->getById($id);
    }
    public function progressCase($id)
    {
        $statuses = $this->caseStatusRepository->getAll();
        return $this->repository->progressCase($id);
    }
}
