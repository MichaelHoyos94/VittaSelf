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
}