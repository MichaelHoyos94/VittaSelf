<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\QualityChecklistAudit;

class QualityChecklistAuditRepository
{
    public function getAll() {
        return QualityChecklistAudit::with(["auditor"])->get();
    }

    public function getById($id) {
        return QualityChecklistAudit::findOrFail($id);
    }

    public function create(array $data) {
        return QualityChecklistAudit::create($data);
    }

    public function update($id, array $data) {}

    public function delete($id) {}
}
