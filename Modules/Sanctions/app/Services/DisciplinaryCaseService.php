<?php

namespace Modules\Sanctions\Services;

use Exception;
use Modules\Sanctions\Exceptions\UserSanctionedException;
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

        $currentStatus = $disciplinaryCase->caseStatus;

        if (!$currentStatus->next_status_id) {
            throw new Exception("Case is already at the final status.");
        }
        $disciplinaryCase->case_status_id = $currentStatus->next_status_id;
        return $this->repository->save($disciplinaryCase);
    }
    public function assignCase($id, $adminId)
    {
        $disciplinaryCase = $this->repository->getById($id);
        $disciplinaryCase->admin_id = $adminId;
        return $this->repository->save($disciplinaryCase);
    }
}
