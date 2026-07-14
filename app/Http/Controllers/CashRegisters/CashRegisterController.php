<?php

namespace App\Http\Controllers\CashRegisters;

use App\Http\Controllers\Controller;
use App\Http\Requests\CashRegisterRequest;
use App\Services\CashRegisterService;
use App\Services\CostCenterService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CashRegisterController extends Controller
{
    public function __construct(
        private CashRegisterService $service,
        private UserService $userService,
        private CostCenterService $costCenterService,
    ) {}
    public function index()
    {
        $cashRegisters = $this->service->getAll();
        $users = $this->userService->getAll();
        $costCenters = $this->costCenterService->getAll();
        return Inertia::render('CashRegisters/Index')->with([
            'cashRegisters' => $cashRegisters,
            'users' => $users,
            'costCenters' => $costCenters,
        ]);
    }
    public function store(CashRegisterRequest $request)
    {
        $data = $request->validated();
        $cashRegister = $this->service->create($data);
        return redirect()->route('')->with('success', 'Cash register created successfully with ID:' . $cashRegister->id);
    }
    #TODO: Implementar funcionalidad para liberar caja
    public function free()
    {
        
    }
    #TODO Implementar logica para asignar empleado
    public function assign()
    {

    }
    #TODO Implementar logica para eliminar caja
    public function destroy()
    {

    }
}