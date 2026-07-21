<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\CashRegisterClosureAudit;

class CashRegisterClosureAuditRepository
{
    public function create($data)
    {
        return CashRegisterClosureAudit::create($data);
    }
}