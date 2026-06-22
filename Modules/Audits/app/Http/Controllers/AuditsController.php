<?php

namespace Modules\Audits\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Modules\Audits\Http\Requests\ProductCountAuditRequest;
use Modules\Audits\Http\Requests\QualityChecklistAuditRequest;
use Modules\Audits\Services\PdfService;
use Modules\Audits\Services\ProductCountAuditService;
use Modules\Audits\Services\QualityChecklistAuditService;

class AuditsController extends Controller
{

    public function __construct(private QualityChecklistAuditService $service, private ProductCountAuditService $productCountAuditService, private PdfService $pdfService) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Audits/Audits/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeQualityChecklistAudit(QualityChecklistAuditRequest $request)
    {
        $validated = $request->validated();
        $audit = $this->service->create($validated);
        $pdfPath = $this->pdfService->generateQualityChecklistAuditPdf($audit);
        $audit->update(['pdf_path' => $pdfPath]);
        return back()->with('success', 'Audit created successfully! ID: ' . $audit->id);
    }

    /**
     * Store a newly created product count audit in storage.
     */
    public function storeProductCountAudit(ProductCountAuditRequest $request)
    {
        $validated = $request->validated();
        $audit = $this->productCountAuditService->create($validated);
        $pdfPath = $this->pdfService->generateProductCountAuditPdf($audit);
        $audit->update(['pdf_path' => $pdfPath]);
        return redirect()->route('audits.history.index')->with('success', 'Product count audit created successfully! ID: ' . $audit->id);
    }
}
