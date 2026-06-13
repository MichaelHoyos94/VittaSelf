<?php

namespace Modules\Audits\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Audits\Http\Requests\QualityChecklistAuditRequest;
use Modules\Audits\Services\QualityChecklistAuditService;

class AuditsController extends Controller
{

    public function __construct(private QualityChecklistAuditService $service) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Audits/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(QualityChecklistAuditRequest $request) {
        $validated = $request->validated();
        $audit = $this->service->create($validated);
        return back()->with('success', 'Audit created successfully! ID: ' . $audit->id);
    }
}
