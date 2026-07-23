<?php

namespace App\Services;

use App\Repositories\CostCenterRepository;

class CostCenterService
{
    public function __construct(
        private CostCenterRepository $costCenterRepository
    ) {}
    public function getAll($search) {
        return $this->costCenterRepository->getAll($search);
    }
    public function create(array $data) {}
    public function getById($id) {}
}
