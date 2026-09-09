<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\QualityChecklistAudit;

class QualityChecklistAuditRepository
{
    public function getAll($search, $perPage = 10, $sortField = 'created_at', $sortDirection = 'asc')
    {
        return QualityChecklistAudit::with(["auditor"])
            ->when($search, function ($query, $search) {
                $query->whereHas('auditor', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getById($id)
    {
        return QualityChecklistAudit::findOrFail($id);
    }

    public function create(array $data)
    {
        return QualityChecklistAudit::create($data);
    }

    public function update($id, array $data) {}

    public function delete($id) {}
}
