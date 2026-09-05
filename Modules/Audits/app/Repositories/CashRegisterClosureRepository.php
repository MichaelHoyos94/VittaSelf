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
    public function getAll($search, $perPage = 10, $sortField = 'created_at', $sortDirection = 'desc')
    {
        $query = CashRegisterClosure::with(['cashRegister.costCenter', 'commercialAgent', 'audit']);

        if ($search) {
            $query->whereHas('cashRegister', function ($q) use ($search) {
                $q->where('name', 'like', "%$search%");
            })->orWhereHas('commercialAgent', function ($q) use ($search) {
                $q->where('name', 'like', "%$search%");
            });
        }

        return $query->orderBy($sortField, $sortDirection)->paginate($perPage);
    }
    public function getById($cashRegisterClosureId)
    {
        return CashRegisterClosure::with(['cashRegister.costCenter', 'commercialAgent'])->findOrFail($cashRegisterClosureId);
    }
}