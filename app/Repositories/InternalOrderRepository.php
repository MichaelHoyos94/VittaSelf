<?php

namespace App\Repositories;

use App\Models\InternalOrder;

class InternalOrderRepository
{
    public function create($data)
    {
        return InternalOrder::create($data);
    }
}