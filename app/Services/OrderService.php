<?php

namespace App\Services;

use App\Repositories\OrderRepository;

class OrderService
{
    public function __construct(private OrderRepository $repository) {}
    public function create($data)
    {
        return $this->repository->create($data);
    }
}