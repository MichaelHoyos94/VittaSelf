<?php

namespace Modules\Audits\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Audits\Http\Requests\CashRegisterClosureRequest;
use Modules\Audits\Services\CashRegisterClosureService;

class CashRegisterClosureController extends Controller
{

    public function __construct(private CashRegisterClosureService $service) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $cashRegisterClosures = $this->service->getAll($search);
        return Inertia::render('Audits/CashRegisterClosings/Index')->with([
            'cashRegisterClosures' => $cashRegisterClosures,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('audits::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CashRegisterClosureRequest $request)
    {
        $data = $request->validated();
        $cashRegisterClosure = $this->service->create($data);
        return redirect()->route('my-cash-register.index')->with('success', 'Cash register closure created successfully. Waiting for approval.');
    }

    public function show($cashRegisterClosureId) {
        $cashRegisterClosure = $this->service->getById($cashRegisterClosureId);
        return Inertia::render('Audits/CashRegisterClosings/Show')->with([
            'cashRegisterClosure' => $cashRegisterClosure,
        ]);
    }
}