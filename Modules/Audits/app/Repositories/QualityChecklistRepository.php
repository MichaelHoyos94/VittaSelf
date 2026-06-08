<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\QualityChecklist;

class QualityChecklistRepository
{
    public function getAll() {
        return QualityChecklist::all();
    }

    public function getById($id) {}

    public function create(array $data) {
        return QualityChecklist::create($data);
    }
}
