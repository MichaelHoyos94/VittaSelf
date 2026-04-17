<?php

namespace Modules\Sanctions\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Sanctions\Services\CatComplianceSourceService;
use Modules\Sanctions\Services\CatPolicyService;

class DisciplinaryCasesController extends Controller
{
    public function __construct(protected CatPolicyService $policiesService, protected CatComplianceSourceService $compliancesService) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $policies = $this->policiesService->getAll();
        $complianceSources = $this->compliancesService->getAll();
        return Inertia::render('Sanctions/DisciplinaryCases/Index')->with([
            'policies' => $policies,
            'complianceSources' => $complianceSources,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('sanctions::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('sanctions::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('sanctions::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {}
}
