<?php

namespace Modules\Sanctions\Services;

use Exception;
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
        $disciplinaryCase = $this->repository->getById($id);
        $currentIndex = $disciplinaryCase->case_status_id;
        $nextIndex = $currentIndex + 1;
        $currentStatus = $this->caseStatusRepository->getById($currentIndex);
        $nextStatus = $this->caseStatusRepository->getById($currentIndex + 1);

        if (!$currentStatus) throw new Exception("Invalid current status.");
        if (!$nextStatus) throw new Exception("Last status reached.");
        $disciplinaryCase->case_status_id = $nextStatus->id;
        return $this->repository->save($disciplinaryCase);
    }
}
