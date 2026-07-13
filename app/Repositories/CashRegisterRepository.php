<?php

namespace App\Repositories;

use App\Models\CashRegister;

class CashRegisterRepository
{
    public function __construct() {}
    public function getAll()
    {
        return CashRegister::with(['costCenter', 'commercialAgent'])->get();
    }
    public function create($data)
    {
        return CashRegister::create($data);
    }
}