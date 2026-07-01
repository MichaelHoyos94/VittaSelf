<?php

use App\Models\CostCenter;
use App\Models\User;
use Illuminate\Database\QueryException;
use Modules\Audits\Models\QualityChecklist;
use Modules\Audits\Models\QualityChecklistAudit;
use Modules\Audits\Services\PdfService;
use Modules\Audits\Services\QualityChecklistAuditService;

it('creates a quality checklist audit and stores its generated PDF path', function () {
    $costCenter = CostCenter::factory()->create();
    $auditor = User::factory()->create(['cost_center_id' => $costCenter->id]);
    $checklist = createQualityChecklistForAudit($costCenter->id);

    $this->mock(PdfService::class)
        ->shouldReceive('generateQualityChecklistAuditPdf')
        ->once()
        ->withArgs(fn (QualityChecklistAudit $audit) => (
            $audit->quality_checklist_id === $checklist->id
            && $audit->audited_by === $auditor->id
        ))
        ->andReturn('audit-reports/audit-test.pdf');

    $response = $this->actingAs($auditor)->post(
        route('audits.quality-checklists.audit'),
        [
            'quality_checklist_id' => $checklist->id,
            'status' => 'good',
            'requires_actions' => true,
            'corrective_actions' => 'Replace the extinguisher during the next visit.',
            'audited_by' => $auditor->id,
            'report' => 'The checklist complies, with one preventive action pending.',
        ]
    );

    $audit = QualityChecklistAudit::query()->sole();

    $response
        ->assertRedirect()
        ->assertSessionHas('success', "Audit created successfully! ID: {$audit->id}");

    $this->assertDatabaseHas('quality_checklist_audit', [
        'id' => $audit->id,
        'quality_checklist_id' => $checklist->id,
        'audited_by' => $auditor->id,
        'status' => 'good',
        'requires_actions' => true,
        'corrective_actions' => 'Replace the extinguisher during the next visit.',
        'report' => 'The checklist complies, with one preventive action pending.',
        'pdf_path' => 'audit-reports/audit-test.pdf',
    ]);
});

it('rejects an invalid quality checklist audit payload', function (array $invalidData, array $errors) {
    $costCenter = CostCenter::factory()->create();
    $auditor = User::factory()->create(['cost_center_id' => $costCenter->id]);
    $checklist = createQualityChecklistForAudit($costCenter->id);
    $payload = [
        'quality_checklist_id' => $checklist->id,
        'status' => 'excellent',
        'requires_actions' => false,
        'corrective_actions' => null,
        'audited_by' => $auditor->id,
        'report' => 'No findings.',
    ];

    $this->actingAs($auditor)
        ->post(route('audits.quality-checklists.audit'), array_merge($payload, $invalidData))
        ->assertSessionHasErrors($errors);

    $this->assertDatabaseCount('quality_checklist_audit', 0);
})->with([
    'unsupported status' => [['status' => 'pending'], ['status']],
    'non-boolean requires actions' => [['requires_actions' => 'sometimes'], ['requires_actions']],
    'unknown checklist' => [['quality_checklist_id' => PHP_INT_MAX], ['quality_checklist_id']],
    'unknown auditor' => [['audited_by' => PHP_INT_MAX], ['audited_by']],
]);

it('prevents a checklist from being audited more than once', function () {
    $costCenter = CostCenter::factory()->create();
    $auditor = User::factory()->create(['cost_center_id' => $costCenter->id]);
    $checklist = createQualityChecklistForAudit($costCenter->id);
    $payload = [
        'quality_checklist_id' => $checklist->id,
        'status' => 'excellent',
        'requires_actions' => false,
        'corrective_actions' => null,
        'audited_by' => $auditor->id,
        'report' => 'No findings.',
    ];

    app(QualityChecklistAuditService::class)->create($payload);

    try {
        app(QualityChecklistAuditService::class)->create($payload);
        $this->fail('A unique constraint violation was expected.');
    } catch (QueryException) {
        $this->assertDatabaseCount('quality_checklist_audit', 1);
    }
});

function createQualityChecklistForAudit(int $costCenterId): QualityChecklist
{
    return QualityChecklist::query()->create([
        'cost_center_id' => $costCenterId,
        'checklist_date' => '2026-06-28',
        'temperature_start' => 19.5,
        'temperature_end' => 21.2,
        'smoke_detector' => true,
        'extingisher_expiration_date' => '2027-01-15',
        'last_plague_control' => '2026-06-01',
        'last_bathroom_sanitation' => '2026-06-27',
        'humidity_percentage' => 48.5,
        'observations' => 'Everything is in order.',
    ]);
}
