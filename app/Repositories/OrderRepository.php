<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{
    public function __construct() {}
    public function getAll() {}
    public function create($data) {
        return Order::create($data);
    }
    public function getById($id) {}
}
