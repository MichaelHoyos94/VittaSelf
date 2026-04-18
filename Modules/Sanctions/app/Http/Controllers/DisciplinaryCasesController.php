<?php

namespace Modules\Sanctions\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Sanctions\Http\Requests\DisciplinaryCaseRequest;
use Modules\Sanctions\Services\CatComplianceSourceService;
use Modules\Sanctions\Services\CatPolicyService;
use Modules\Sanctions\Services\DisciplinaryCaseService;

use function Psy\debug;

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
        return Inertia::render('Sanctions/DisciplinaryCases/Index')->with([
            'policies' => $policies,
            'complianceSources' => $complianceSources,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DisciplinaryCaseRequest $request)
    {
        $validatedData = $request->validated();
        $disciplinaryCase = $this->service->create($validatedData);
        return redirect()->route('sanctions.disciplinary-cases.index')->with('success', 'Disciplinary case created successfully.');
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
