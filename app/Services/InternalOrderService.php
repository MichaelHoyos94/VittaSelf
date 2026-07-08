<?php

namespace App\Services;

use App\Repositories\InternalOrderRepository;

class InternalOrderService
{
    public function __construct(private InternalOrderRepository $internalOrderRepository) {}
    public function create($data) {
        $internalOrder = $this->internalOrderRepository->create($data);
    }
    public function getAll() {}
}