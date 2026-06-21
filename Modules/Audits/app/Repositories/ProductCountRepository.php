<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\ProductCount;

class ProductCountRepository
{
    public function getAll()
    {
        return ProductCount::all();
    }

    public function create(array $data)
    {
        return ProductCount::create($data);
    }
    public function getById($id) {
        return ProductCount::FindOrFail($id);
    }
}
