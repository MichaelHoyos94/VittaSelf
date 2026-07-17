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
        return redirect()->route('cash-register-manage.cash-registers.index')->with('success', 'Cash register created successfully with ID:' . $cashRegister->id);
    }
    #TODO: Implementar funcionalidad para liberar caja
    public function release($cashRegisterId)
    {
        $released = $this->service->free($cashRegisterId);
        if ($released)
            return redirect()->route('cash-register-manage.cash-registers.index')->with('success', 'Cash register liberated.');
        else
            return redirect()->route('cash-register-manage.cash-registers.index')->with('error', 'Failed to release cash register.');
    }
    #TODO Implementar logica para asignar empleado
    public function assign(Request $request, $cashRegisterId)
    {
        $assigned = $this->service->assign($cashRegisterId, $request->commercial_agent_id);
        if ($assigned) {
            return redirect()->route('cash-register-manage.cash-registers.index')->with('success', 'Cash register assigned successfully');
        } else {
            return redirect()->route('cash-register-manage.cash-registers.index')->with('error', 'Failed to assign cash register');
        }
    }
    #TODO Implementar logica para eliminar caja
    public function destroy($cashRegisterId)
    {

    }
    public function openCashRegister()
    {
        $userId = auth()->user()->id;
        $opened = $this->service->openCashRegister($userId);
        if ($opened)
            return redirect()->route('my-cash-register.index')->with('success', 'Cash register open successfully. Now you can create internal orders.');
        else
            return redirect()->route('my-cash-register.index')->with('error', 'Something went wrong');
    }

    public function MyCashRegister()
    {
        $user = auth()->user();
        $user->load('cashRegister.costCenter');
        $cashRegister = $user->cashRegister;
        return Inertia::render('CashRegisters/MyCashRegister')->with([
            'cashRegister' => $cashRegister,
        ]);
    }

    public function closeCashRegister()
    {
        $userId = auth()->user()->id;
        $closed = $this->service->closeCashRegister($userId);
        if ($closed)
            return redirect()->route('my-cash-register.index')->with('success', 'Cash register closed successfully.');
        else
            return redirect()->route('my-cash-register.index')->with('error', 'Something went wrong');
    }
}