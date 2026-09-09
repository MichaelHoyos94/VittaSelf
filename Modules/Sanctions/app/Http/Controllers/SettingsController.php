<?php

namespace Modules\Sanctions\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Sanctions\Http\Requests\ComplianceSourceRequest;
use Modules\Sanctions\Http\Requests\MitigationRequest;
use Modules\Sanctions\Http\Requests\PolicyRequest;
use Modules\Sanctions\Models\CatPolicy;
use Modules\Sanctions\Repositories\CatComplianceSourceRepository;
use Modules\Sanctions\Repositories\CatMitigationRepository;
use Modules\Sanctions\Repositories\CatPolicyRepository;

class SettingsController extends Controller
{

    public function __construct(
        private CatPolicyRepository $policiesRepository,
        private CatMitigationRepository $mitigationRepository,
        private CatComplianceSourceRepository $complianceSourceRepository,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Sanctions/Settings/Index');
    }

    public function policies()
    {
        return Inertia::render('Sanctions/Settings/Policies/Index')->with([
            'policies' => CatPolicy::all(),
        ]);
    }

    public function storePolicy(PolicyRequest $request)
    {
        $validated = $request->validated();

        $policy = $this->policiesRepository->create($validated);

        return redirect()->route('sanctions.settings.policies.index')->with('success', 'Policy ' . $policy->code . ' created successfully.');
    }

    public function updatePolicy(PolicyRequest $request, $id)
    {
        $validated = $request->validated();

        $policy = $this->policiesRepository->update($id, $validated);

        return redirect()->route('sanctions.settings.policies.index')->with('success', 'Policy ' . $policy->code . ' updated successfully.');
    }

    public function activatePolicy($id)
    {
        $policy = $this->policiesRepository->activate($id);

        return redirect()->route('sanctions.settings.policies.index')->with('success', 'Policy ' . $policy->code . ' activated successfully.');
    }

    public function inactivatePolicy($id)
    {
        $policy = $this->policiesRepository->inactivate($id);

        return redirect()->route('sanctions.settings.policies.index')->with('success', 'Policy ' . $policy->code . ' inactivated successfully.');
    }

    // ================================================ Mitigations ======================================= //

    public function mitigations()
    {
        $mitigations = $this->mitigationRepository->getAll();
        return Inertia::render('Sanctions/Settings/Mitigations/Index')->with([
            'mitigations' => $mitigations,
        ]);
    }

    public function storeMitigation(MitigationRequest $request) {
        $validated = $request->validated();
        $mitigation = $this->mitigationRepository->create($validated);
        return redirect()->route('sanctions.settings.mitigations.index')->with('success', 'Mitigation ' . $mitigation->code . ' created successfully.');
    }

    public function updateMitigation(MitigationRequest $request, $id) {
        $validated = $request->validated();
        $mitigation = $this->mitigationRepository->update($id, $validated);
        return redirect()->route('sanctions.settings.mitigations.index')->with('success', 'Mitigation ' . $mitigation->code . ' updated successfully.');
    }

    public function activateMitigation($id) {
        $mitigation = $this->mitigationRepository->activate($id);
        return redirect()->route('sanctions.settings.mitigations.index')->with('success', 'Mitigation ' . $mitigation->code . ' activated successfully.');
    }

    public function inactivateMitigation($id) {
        $mitigation = $this->mitigationRepository->inactivate($id);
        return redirect()->route('sanctions.settings.mitigations.index')->with('success', 'Mitigation ' . $mitigation->code . ' inactivated successfully.');
    }

    // ============================================= Compliance Sources =================================== //

    public function complianceSources()
    {
        $complianceSources = $this->complianceSourceRepository->getAll();
        return Inertia::render('Sanctions/Settings/ComplianceSources/Index')->with([
            'complianceSources' => $complianceSources,
        ]);
    }

    public function storeComplianceSource(ComplianceSourceRequest $request) {
        $validated = $request->validated();
        $complianceSource = $this->complianceSourceRepository->create($validated);
        return redirect()->route('sanctions.settings.compliance-sources.index')->with('success', 'Compliance ' . $complianceSource->code . ' source created successfully.');
    }

    public function updateComplianceSource() {}

    public function activateComplianceSource($complianceSourceId) {
        $complianceSource = $this->complianceSourceRepository->activate($complianceSourceId);
        return redirect()->route('sanctions.settings.compliance-sources.index')->with('success', 'Compliance source ' . $complianceSource->code . ' activated successfully.');
    }

    public function inactivateComplianceSource($complianceSourceId) {
        $complianceSource = $this->complianceSourceRepository->inactivate($complianceSourceId);
        return redirect()->route('sanctions.settings.compliance-sources.index')->with('success', 'Compliance source ' . $complianceSource->code . ' inactivated successfully.');
    }
}
