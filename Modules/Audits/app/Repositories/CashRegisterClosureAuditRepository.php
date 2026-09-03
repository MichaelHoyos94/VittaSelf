<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\CashRegisterClosureAudit;

class CashRegisterClosureAuditRepository
{
    public function getAll($search, $perPage = 10, $sortField = 'created_at', $sortDirection = 'asc')
    {
        return CashRegisterClosureAudit::with(['auditor'])
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
        return CashRegisterClosureAudit::findOrFail($id);
    }
    public function create($data)
    {
        return CashRegisterClosureAudit::create($data);
    }
}
