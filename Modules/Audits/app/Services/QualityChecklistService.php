<?php

namespace Modules\Audits\Services;

use Exception;
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
        // Si existe una checklist para el mismo cost center y fecha, lanzar error
        $existing = $this->repository->findByCostCenterAndDate($data['cost_center_id'], $data['checklist_date']);
        if ($existing) {
            throw new Exception('There is already a checklist for today on this cost center.');
        }
        return $this->repository->create($data);
    }
}
