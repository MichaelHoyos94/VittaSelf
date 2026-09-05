<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\QualityChecklist;

class QualityChecklistRepository
{
    public function getAll($costCenterId = null, $perPage = 10, $sortField = "created_at", $sortDirection = "desc")
    {
        return QualityChecklist::with(['costCenter', 'audit'])
            ->when($costCenterId, function ($query, $costCenterId) {
                $query->where('cost_center_id', $costCenterId);
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage);
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
            ->where('checklist_date', $date)
            ->first();
    }
}
