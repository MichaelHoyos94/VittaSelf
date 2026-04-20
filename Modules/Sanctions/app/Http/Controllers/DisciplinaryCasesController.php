<?php

namespace Modules\Sanctions\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Sanctions\Http\Requests\DisciplinaryCaseRequest;
use Modules\Sanctions\Services\CatComplianceSourceService;
use Modules\Sanctions\Services\CatPolicyService;
use Modules\Sanctions\Services\DisciplinaryCaseService;

class DisciplinaryCasesController extends Controller
{
    public function __construct(
        protected DisciplinaryCaseService $service,
        protected CatPolicyService $policiesService,
        protected CatComplianceSourceService $compliancesService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $policies = $this->policiesService->getAll();
        $complianceSources = $this->compliancesService->getAll();
        $disciplinaryCases = $this->service->getAll();
        return Inertia::render('Sanctions/DisciplinaryCases/Index')->with([
            'policies' => $policies,
            'complianceSources' => $complianceSources,
            'disciplinaryCases' => $disciplinaryCases,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DisciplinaryCaseRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['admin_id'] = $request->user()->id;
        $disciplinaryCase = $this->service->create($validatedData);
        return redirect()->route('sanctions.disciplinary-cases.index')->with('success', 'Disciplinary case created successfully.');
    }

    public function manageCase($id)
    {
        $disciplinaryCase = $this->service->getById($id);
        return Inertia::render('Sanctions/DisciplinaryCases/ManageCase')->with([
            'disciplinaryCase' => $disciplinaryCase
        ]);
    }

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
