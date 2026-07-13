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
    public function index()
    {
        return Inertia::render('Audits/CashRegisterClosings/Index');
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
    }

    public function show($cashRegisterClosureId) {}
}