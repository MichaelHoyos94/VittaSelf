<?php

namespace App\Repositories;

use App\Models\CostCenter;

class CostCenterRepository
{
    public function __construct() {}

    public function getAllSearch($search, $perPage = 10, $sortField = 'created_at', $sortDirection = 'asc')
    {
        return CostCenter::query()
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage);
    }

    public function getAll()
    {
        return CostCenter::all();
    }

    public function create(array $data)
    {
        return CostCenter::create($data);
    }

    public function getById($id)
    {
        return CostCenter::findOrFail($id);
    }

    public function update($id, array $data)
    {
        $costCenter = $this->getById($id);
        $costCenter->update($data);

        return $costCenter;
    }

    public function delete($id): bool
    {
        $costCenter = $this->getById($id);
        $costCenter->delete();

        return true;
    }
}
