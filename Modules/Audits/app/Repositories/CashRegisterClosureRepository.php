<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\CashRegisterClosure;

class CashRegisterClosureRepository
{
    public function __construct() {}
    public function create($data)
    {
        return CashRegisterClosure::create($data);
    }
    public function getAll()
    {
        return CashRegisterClosure::with(['cashRegister.costCenter', 'commercialAgent'])->get();
    }
    public function getById($cashRegisterClosureId)
    {
        return CashRegisterClosure::with(['cashRegister.costCenter', 'commercialAgent'])->findOrFail($cashRegisterClosureId);
    }
}