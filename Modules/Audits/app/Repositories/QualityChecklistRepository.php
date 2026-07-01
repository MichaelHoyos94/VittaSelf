<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\QualityChecklist;

class QualityChecklistRepository
{
    public function getAll()
    {
        return QualityChecklist::all();
    }

    public function getById($id)
    {
        return QualityChecklist::find($id);
    }

    public function findByCostCenter($costCenterId)
    {
        return QualityChecklist::where('cost_center_id', $costCenterId)->get();
    }

    public function create(array $data)
    {
        return QualityChecklist::create($data);
    }

    public function findByCostCenterAndDate($costCenterId, $date)
    {
        return QualityChecklist::where('cost_center_id', $costCenterId)
            ->whereDate('checklist_date', $date)
            ->first();
    }
}
