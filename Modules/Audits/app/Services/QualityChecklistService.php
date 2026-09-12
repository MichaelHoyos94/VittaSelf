<?php

namespace Modules\Audits\Services;

use Modules\Audits\Exceptions\QualityChecklistAlreadyExistsException;
use Modules\Audits\Repositories\QualityChecklistRepository;

class QualityChecklistService
{
    public function __construct(protected QualityChecklistRepository $repository) {}

    public function getAll($costCenterId)
    {
        return $this->repository->getAll($costCenterId);
    }

    public function getById($id) {}

    public function getByCostCenter($costCenterId)
    {
        return $this->repository->findByCostCenter($costCenterId);
    }

    public function create(array $data)
    {
        $existing = $this->repository->findByCostCenterAndDate($data['cost_center_id'], $data['checklist_date']);
        if ($existing) {
            throw new QualityChecklistAlreadyExistsException;
        }

        return $this->repository->create($data);
    }
}
