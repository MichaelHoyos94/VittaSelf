<?php

namespace App\Repositories;

use App\Models\CostCenter;

class CostCenterRepository
{
    public function __construct() {}
    public function getAll($search, $perPage = 10, $sortField = 'created_at', $sortDirection = 'asc') {
        return CostCenter::query()
            ->when($search, function($query, $search){
                return $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage);
    }
    public function create(array $data) {}
    public function getById($id) {}
}