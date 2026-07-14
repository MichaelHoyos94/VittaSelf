<?php

namespace App\Repositories;

use App\Models\CostCenter;

class CostCenterRepository
{
    public function __construct() {}
    public function getAll() {
        return CostCenter::all();
    }
    public function create(array $data) {}
    public function getById($id) {}
}