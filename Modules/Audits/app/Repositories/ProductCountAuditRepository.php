<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\ProductCountAudit;

class ProductCountAuditRepository
{
    public function __construct() {}
    public function getAll($search, $perPage = 10, $sortField = 'created_at', $sortDirection = 'asc')
    {
        return ProductCountAudit::with(["auditor"])
            ->when($search, function ($query, $search) {
                $query->whereHas('auditor', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage)
            ->withQueryString();
    }
    public function create($data)
    {
        return ProductCountAudit::create($data);
    }
    public function getById($id)
    {
        return ProductCountAudit::findOrFail($id);
    }
}
