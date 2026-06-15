<?php

namespace Modules\Audits\Services;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
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
}
