<?php

namespace Modules\Audits\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Audits\Http\Requests\QualityChecklistRequest;
use Modules\Audits\Services\QualityChecklistService;

class QualityChecklistsController extends Controller
{
    // Inject services and repos
    public function __construct(private QualityChecklistService $service){}

    public function index() {
        // Load curren user -> costcenter
        $costCenter = auth()->user()->costCenter;
        return Inertia::render('Audits/QualityChecklists/Index')->with([
            'costCenter' => $costCenter,
        ]);
    }

    public function store(QualityChecklistRequest $request) {
        $validated = $request->validated();
        try {
            $this->service->create($validated);
            return redirect()->route('audits.quality-checklists.index')->with('success', 'Checklist created successfully.');
        } catch (\Exception $e) {
            return redirect()->route('audits.quality-checklists.index')->with('error', $e->getMessage());
        }
    }
}
