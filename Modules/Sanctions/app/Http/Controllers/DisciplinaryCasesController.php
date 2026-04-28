<?php

namespace Modules\Sanctions\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Sanctions\Http\Requests\DisciplinaryCaseRequest;
use Modules\Sanctions\Services\CatCaseStatusService;
use Modules\Sanctions\Services\CatComplianceSourceService;
use Modules\Sanctions\Services\CatMitigationService;
use Modules\Sanctions\Services\CatPolicyService;
use Modules\Sanctions\Services\CatSanctionLevelService;
use Modules\Sanctions\Services\CatSanctionService;
use Modules\Sanctions\Services\DisciplinaryCaseService;

class DisciplinaryCasesController extends Controller
{
    public function __construct(
        protected DisciplinaryCaseService $service,
        protected CatPolicyService $policiesService,
        protected CatComplianceSourceService $compliancesService,
        protected CatCaseStatusService $caseStatusService,
        protected CatSanctionService $sanctionsService,
        protected CatSanctionLevelService $sanctionLevelsService,
        protected CatMitigationService $mitigationsService
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
        $statuses = $this->caseStatusService->getAllStatuses();
        $sanctions = $this->sanctionsService->getAll();
        $sanctionLevels = $this->sanctionLevelsService->getAll();
        $mitigations = $this->mitigationsService->getAll();
        return Inertia::render('Sanctions/DisciplinaryCases/ManageCase')->with([
            'disciplinaryCase' => $disciplinaryCase,
            'caseStatuses' => $statuses,
            'sanctions' => $sanctions,
            'sanctionLevels' => $sanctionLevels,
            'mitigations' => $mitigations
        ]);
    }
    #TODO: Terminar el metodo y avanzar en el progress
    public function assignCase(Request $request, $id)
    {
        $disciplinaryCase = $this->service->assignCase($id, $request->user()->id);
        return back()->with('success', 'Case assigned to you successfully.');
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

    public function progressCase($id)
    {
        $disciplinaryCase = $this->service->progressCase($id);
        return back()->with('success', 'Case progressed to next stage successfully.');
    }
}
