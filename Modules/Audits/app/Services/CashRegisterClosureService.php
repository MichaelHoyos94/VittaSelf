<?php

namespace Modules\Audits\Services;

use Modules\Audits\Repositories\CashRegisterClosureRepository;

class CashRegisterClosureService
{
    public function __construct(private CashRegisterClosureRepository $repository) {}
    public function create($data)
    {
        return $this->repository->create($data);
    }
    public function show($cashRegisterClosureId)
    {

    }
}