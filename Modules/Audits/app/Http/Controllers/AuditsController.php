<?php

namespace Modules\Audits\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Modules\Audits\Http\Requests\QualityChecklistAuditRequest;
use Modules\Audits\Services\PdfService;
use Modules\Audits\Services\QualityChecklistAuditService;

class AuditsController extends Controller
{

    public function __construct(private QualityChecklistAuditService $service, private PdfService $pdfService) {}

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
        $pdfPath = $this->pdfService->generateQualityChecklistAuditPdf($audit);
        $audit->update(['pdf_path' => $pdfPath]);
        return back()->with('success', 'Audit created successfully! ID: ' . $audit->id);
    }
}
