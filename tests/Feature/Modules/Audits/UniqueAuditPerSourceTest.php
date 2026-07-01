<?php

use App\Models\CostCenter;
use App\Models\User;
use Modules\Audits\Models\ProductCount;
use Modules\Audits\Models\ProductCountAudit;
use Modules\Audits\Models\QualityChecklist;
use Modules\Audits\Models\QualityChecklistAudit;
use Modules\Audits\Services\PdfService;

it('rejects a second audit for the same product count', function () {
    $costCenter = CostCenter::factory()->create();
    $auditor = User::factory()->create(['cost_center_id' => $costCenter->id]);
    $productCount = ProductCount::query()->create([
        'cost_center_id' => $costCenter->id,
        'counted_by' => $auditor->id,
        'count_date' => '2026-06-28',
        'observations' => null,
    ]);

    $pdfService = $this->mock(PdfService::class);
    $pdfService->shouldReceive('generateProductCountAuditPdf')
        ->andReturn('audit-reports/product-count-test.pdf');

    $payload = [
        'product_count_id' => $productCount->id,
        'status' => 'CORRECT',
        'audited_by' => $auditor->id,
        'audited_at' => '2026-06-28 10:00:00',
        'total_expected_products' => 10,
        'total_counted_products' => 10,
        'total_difference' => 0,
        'products_with_mismatch' => 0,
        'products_with_observations' => 0,
        'requires_recount' => false,
        'report' => 'The product count is correct.',
    ];

    $this->actingAs($auditor)
        ->post(route('audits.product-counts.audit'), $payload)
        ->assertSessionHasNoErrors();

    $this->actingAs($auditor)
        ->post(route('audits.product-counts.audit'), $payload)
        ->assertSessionHasErrors('product_count_id');

    $this->assertDatabaseCount('product_count_audits', 1);
    expect(ProductCountAudit::query()->where('product_count_id', $productCount->id)->count())
        ->toBe(1);
    $pdfService->shouldHaveReceived('generateProductCountAuditPdf')->once();
});

it('rejects a second audit for the same quality checklist', function () {
    $costCenter = CostCenter::factory()->create();
    $auditor = User::factory()->create(['cost_center_id' => $costCenter->id]);
    $checklist = QualityChecklist::query()->create([
        'cost_center_id' => $costCenter->id,
        'checklist_date' => '2026-06-28',
        'temperature_start' => 19.5,
        'temperature_end' => 21.2,
        'smoke_detector' => true,
        'extingisher_expiration_date' => '2027-01-15',
        'last_plague_control' => '2026-06-01',
        'last_bathroom_sanitation' => '2026-06-27',
        'humidity_percentage' => 48.5,
        'observations' => null,
    ]);

    $pdfService = $this->mock(PdfService::class);
    $pdfService->shouldReceive('generateQualityChecklistAuditPdf')
        ->andReturn('audit-reports/quality-checklist-test.pdf');

    $payload = [
        'quality_checklist_id' => $checklist->id,
        'status' => 'excellent',
        'requires_actions' => false,
        'corrective_actions' => null,
        'audited_by' => $auditor->id,
        'report' => 'The checklist has no findings.',
    ];

    $this->actingAs($auditor)
        ->post(route('audits.quality-checklists.audit'), $payload)
        ->assertSessionHasNoErrors();

    $this->actingAs($auditor)
        ->post(route('audits.quality-checklists.audit'), $payload)
        ->assertSessionHasErrors('quality_checklist_id');

    $this->assertDatabaseCount('quality_checklist_audit', 1);
    expect(QualityChecklistAudit::query()->where('quality_checklist_id', $checklist->id)->count())
        ->toBe(1);
    $pdfService->shouldHaveReceived('generateQualityChecklistAuditPdf')->once();
});
