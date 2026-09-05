<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\ProductCount;

class ProductCountRepository
{
    public function getAll($search, $perPage = 10, $sortField = 'created_at', $sortDirection = 'desc')
    {
        return ProductCount::with(['audit', 'user', 'costCenter'])
            ->when($search, function($query, $search){
                $query->whereHas('user', function($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('costCenter', function($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage);
    }

    public function create(array $data)
    {
        return ProductCount::create($data);
    }
    public function getById($id)
    {
        return ProductCount::with(['costCenter.stocks', 'user', 'productQuantities.product'])->findOrFail($id);
    }
}
