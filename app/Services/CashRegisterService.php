<?php

namespace App\Services;

use App\Repositories\CashRegisterRepository;

class CashRegisterService
{
    public function __construct(private CashRegisterRepository $repository) {}
    public function getAll()
    {
        return $this->repository->getAll();
    }
    public function create($data)
    {
        return $this->repository->create($data);
    }
    public function assign($cashRegisterId, $commercialAgentId)
    {
        $cashRegister = $this->repository->getById($cashRegisterId);
        $cashRegister['commercial_agent_id'] = $commercialAgentId;
        return $this->repository->update($cashRegister);
    }
    public function free($cashRegisterId)
    {
        $cashRegister = $this->repository->getById($cashRegisterId);
        $cashRegister['commercial_agent_id'] = null;
        return $this->repository->update($cashRegister);
    }
    public function openCashRegister($commercialAgentId)
    {
        $cashRegister = $this->repository->getByCommercialAgentId($commercialAgentId);
        $cashRegister->is_open = true;
        return $this->repository->update($cashRegister);
    }
    public function closeCashRegister($commercialAgentId)
    {
        $cashRegister = $this->repository->getByCommercialAgentId($commercialAgentId);
        $cashRegister->is_open = false;
        return $this->repository->update($cashRegister);
    }
}