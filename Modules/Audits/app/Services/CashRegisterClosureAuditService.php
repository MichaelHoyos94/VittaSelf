<?php

namespace Modules\Audits\Services;

use Modules\Audits\Repositories\CashRegisterClosureAuditRepository;

class CashRegisterClosureAuditService
{
    public function __construct(private CashRegisterClosureAuditRepository $repository) {}
    public function create($data)
    {
        return $this->repository->create($data);
    }
}