<?php

namespace Modules\Sanctions\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Sanctions\Exceptions\UserSanctionedException;
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
        protected CatMitigationService $mitigationsService,
        protected UserService $userService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userToSanction = null;
        if ($request->filled('eui_code')) {
            $userToSanction = $this->userService->getByEuiCode($request->eui_code);
        }
        $policies = $this->policiesService->getAll();
        $complianceSources = $this->compliancesService->getAll();
        $disciplinaryCases = $this->service->getAll();
        return Inertia::render('Sanctions/DisciplinaryCases/Index')->with([
            'userToSanction' => $userToSanction,
            'policies' => $policies,
            'complianceSources' => $complianceSources,
            'disciplinaryCases' => $disciplinaryCases,
        ]);
    }

    public function myCases()
    {
        $userId = auth()->user()->id;
        $myCases = $this->service->getMyCases($userId);
        return Inertia::render('Sanctions/DisciplinaryCases/MyCases')->with([
            'cases' => $myCases,
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

    public function manageCase($id)
    {
        $disciplinaryCase = $this->service->getById($id);
        if ($disciplinaryCase->caseStatus->case_status !== 'Sin asignar' && $disciplinaryCase->admin_id !== auth()->id()) {
            abort(403, 'You are not authorized to manage this case.');
        }
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
    
    public function assignCase(Request $request, $id)
    {
        $disciplinaryCase = $this->service->assignCase($id, $request->user()->id);
        $disciplinaryCase = $this->service->progressCase($disciplinaryCase->id);
        return back()->with('success', 'Case assigned to you successfully.');
    }

    public function progressCase($id)
    {
        $disciplinaryCase = $this->service->progressCase($id);
        return back()->with('success', 'Case progressed to next stage successfully.');
    }
}
