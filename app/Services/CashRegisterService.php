<?php

namespace App\Services;

use App\Repositories\CashRegisterRepository;

class CashRegisterService
{
    public function __construct(private CashRegisterRepository $repository) {}
    public function getAll()
    {
        return $this->repository->getAll();
    }
    public function create($data)
    {
        return $this->repository->create($data);
    }
}