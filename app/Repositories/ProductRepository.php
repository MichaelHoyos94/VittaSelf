<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    public function __construct() {}
    public function getAll($search, $perPage = 10, $sortField = 'created_at', $sortDirection = 'asc')
    {
        return Product::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage)
            ->withQueryString();
    }
    public function create(array $data) {}
    public function getById($id)
    {
        return Product::findOrFail($id);
    }
}
