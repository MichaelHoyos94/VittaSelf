<?php

namespace App\Http\Controllers\CashRegisters;

use App\Http\Controllers\Controller;
use App\Http\Requests\CashRegisterRequest;
use App\Services\CashRegisterService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CashRegisterController extends Controller
{
    public function __construct(private CashRegisterService $service) {}
    public function index()
    {
        return Inertia::render('CashRegisters/Index');
    }
    public function store(CashRegisterRequest $request)
    {
        $data = $request->validated();
        $cashRegister = $this->service->create($data);
        return redirect()->route('')->with('success', 'Cash register created successfully with ID:' . $cashRegister->id);
    }
}