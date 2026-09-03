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
    public function getById($cashRegisterId)
    {
        return CashRegister::findOrFail($cashRegisterId);
    }
    public function update($cashRegister)
    {
        return $cashRegister->save();
    }
    public function delete($cashRegister)
    {
        return $cashRegister->delete();
    }
    public function getByCommercialAgentId($commercialAgentId)
    {
        return CashRegister::where('commercial_agent_id', $commercialAgentId)->first();
    }
}
