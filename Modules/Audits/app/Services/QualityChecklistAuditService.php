<?php

namespace Modules\Audits\Services;

use Modules\Audits\Repositories\QualityChecklistAuditRepository;

class QualityChecklistAuditService
{

    public function __construct(private QualityChecklistAuditRepository $repository) {}

    public function getAll() {
        return $this->repository->getAll();
    }

    public function getById($id) {
        return $this->repository->getById($id);
    }

    public function create(array $data) {
        return $this->repository->create($data);
    }

    public function update($id, array $data) {}

    public function delete($id) {}
}
