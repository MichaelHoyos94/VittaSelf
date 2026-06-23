<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\QualityChecklistAudit;

class QualityChecklistAuditRepository
{
    public function getAll() {
        return QualityChecklistAudit::all();
    }

    public function getById($id) {}

    public function create(array $data) {
        return QualityChecklistAudit::create($data);
    }

    public function update($id, array $data) {}

    public function delete($id) {}
}
