<?php

namespace Modules\Audits\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\CashRegisterService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Audits\Http\Requests\CashRegisterClosureAuditRequest;
use Modules\Audits\Http\Requests\ProductCountAuditRequest;
use Modules\Audits\Http\Requests\QualityChecklistAuditRequest;
use Modules\Audits\Services\CashRegisterClosureAuditService;
use Modules\Audits\Services\PdfService;
use Modules\Audits\Services\ProductCountAuditService;
use Modules\Audits\Services\QualityChecklistAuditService;

class AuditsController extends Controller
{

    public function __construct(
        private QualityChecklistAuditService $service,
        private ProductCountAuditService $productCountAuditService,
        private CashRegisterClosureAuditService $cashRegisterClosureAuditService,
        private CashRegisterService $cashRegisterService,
        private PdfService $pdfService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search') ?: null;
        $productCountAudits = $this->productCountAuditService->getAll($search);
        $qualityChecklistAudits = $this->service->getAll($search);
        $cashRegisterClosuresAudits = $this->cashRegisterClosureAuditService->getAll($search);
        return Inertia::render('Audits/Audits/Index')->with([
            'productCountAudits' => $productCountAudits,
            'qualityChecklistAudits' => $qualityChecklistAudits,
            'cashRegisterClosuresAudits' => $cashRegisterClosuresAudits,
        ]);
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

    public function storeCashRegisterClosureAudit(CashRegisterClosureAuditRequest $request)
    {
        $validated = $request->validated();
        $audit = $this->cashRegisterClosureAuditService->create($validated);
        $audit->load(['cashRegisterClosure.commercialAgent']);
        $commercialAgentId = $audit->cashRegisterClosure->commercialAgent->id;
        if ($audit->status === 'approved') $this->cashRegisterService->closeCashRegister($commercialAgentId);
        $pdfPath = $this->pdfService->generateCashRegisterClosureAuditPdf($audit);
        $audit->update(['pdf_path' => $pdfPath]);
        return redirect()->route('audits.history.index')->with('success', 'Cash register closure audit created successfully! ID: ' . $audit->id);
    }

    public function downloadProductCountAuditReport($id)
    {
        $audit = $this->productCountAuditService->getById($id);
        return $this->pdfService->download($audit);
    }

    public function downloadQualityChecklistAuditReport($id)
    {
        $audit = $this->service->getById($id);
        return $this->pdfService->download($audit);
    }

    public function downloadCashRegisterClosureAuditReport($id)
    {
        $audit = $this->cashRegisterClosureAuditService->getById($id);
        return $this->pdfService->download($audit);
    }
}