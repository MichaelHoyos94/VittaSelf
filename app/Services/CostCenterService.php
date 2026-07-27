<?php

namespace App\Services;

use App\Repositories\CostCenterRepository;

class CostCenterService
{
    public function __construct(
        private CostCenterRepository $costCenterRepository
    ) {}
    public function getAllSearch($search)
    {
        return $this->costCenterRepository->getAllSearch($search);
    }
    public function getAll() {
        return $this->costCenterRepository->getAll();
    }
    public function create(array $data) {}
    public function getById($id) {}
}
