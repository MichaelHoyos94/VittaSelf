<?php

namespace Modules\Audits\Services;

use Modules\Audits\Repositories\CashRegisterClosureAuditRepository;

class CashRegisterClosureAuditService
{
    public function __construct(private CashRegisterClosureAuditRepository $repository) {}
    public function getAll($search)
    {
        return $this->repository->getAll($search);
    }
    public function getById($id)
    {
        return $this->repository->getById($id);
    }
    public function create($data)
    {
        return $this->repository->create($data);
    }
}
