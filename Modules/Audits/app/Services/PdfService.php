<?php

namespace Modules\Audits\Services;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Modules\Audits\Models\CashRegisterClosureAudit;
use Modules\Audits\Models\ProductCountAudit;
use Modules\Audits\Models\QualityChecklistAudit;

class PdfService
{
    public function generateQualityChecklistAuditPdf(QualityChecklistAudit $audit): string
    {
        $audit->load('auditor');

        $pdf = Pdf::loadView('audits::pdfs.audit-report', [
            'audit' => $audit,
        ])->setPaper('letter');

        $fileName = 'audit-reports/audit-' . $audit->id . '.pdf';

        Storage::disk('local')->put($fileName, $pdf->output());

        return $fileName;
    }

    public function generateProductCountAuditPdf(ProductCountAudit $audit): string
    {
        $audit->load('auditor');

        $pdf = Pdf::loadView('audits::pdfs.product-count-audit-report', [
            'audit' => $audit,
        ])->setPaper('letter');

        $fileName = 'audit-reports/product-count-' . $audit->id . '.pdf';

        Storage::disk('local')->put($fileName, $pdf->output());

        return $fileName;
    }

    public function generateCashRegisterClosureAudit(CashRegisterClosureAudit $audit): string
    {
        $audit->load('auditor');
        $audit->load('cashRegisterClosure.cashRegister');

        $pdf = Pdf::loadView('audits::pdfs.product-count-audit-report', [
            'audit' => $audit,
        ])->setPaper('letter');

        $fileName = 'audit-reports/cash-register-closure-' . $audit->id . '.pdf';

        Storage::disk('local')->put($fileName, $pdf->output());

        return $fileName;
    }

    public function download($audit)
    {
        abort_if(!$audit->pdf_path, 404, 'No report generated.');
        abort_if(!Storage::disk('local')->exists($audit->pdf_path), 404, 'El archivo PDF no existe.');
        return Storage::disk('local')->download(
            $audit->pdf_path,
            'audit-' . $audit->id . '.pdf'
        );
    }
}
