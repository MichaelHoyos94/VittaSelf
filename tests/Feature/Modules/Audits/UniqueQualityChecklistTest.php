<?php

use App\Models\CostCenter;
use App\Models\User;

it('rejects a second checklist for the same cost center and date', function () {
    $costCenter = CostCenter::factory()->create();
    $user = User::factory()->create(['cost_center_id' => $costCenter->id]);
    $payload = qualityChecklistPayload($costCenter->id, '2026-06-28');

    $this->actingAs($user)->post(route('audits.quality-checklists.store'), $payload)
        ->assertRedirect(route('audits.quality-checklists.index'))
        ->assertSessionHas('success', 'Checklist created successfully.');

    $this->actingAs($user)->post(route('audits.quality-checklists.store'), $payload)
        ->assertRedirect(route('audits.quality-checklists.index'))
        ->assertSessionHas(
            'error',
            'There is already a checklist for today on this cost center.'
        );

    $this->assertDatabaseCount('quality_checklist', 1);
});

it('allows the same checklist date for different cost centers', function () {
    $firstCostCenter = CostCenter::factory()->create();
    $secondCostCenter = CostCenter::factory()->create();
    $user = User::factory()->create(['cost_center_id' => $firstCostCenter->id]);

    $this->actingAs($user)->post(
        route('audits.quality-checklists.store'),
        qualityChecklistPayload($firstCostCenter->id, '2026-06-28')
    )->assertSessionHasNoErrors();

    $this->actingAs($user)->post(
        route('audits.quality-checklists.store'),
        qualityChecklistPayload($secondCostCenter->id, '2026-06-28')
    )->assertSessionHasNoErrors();

    $this->assertDatabaseCount('quality_checklist', 2);
});

it('allows different checklist dates for the same cost center', function () {
    $costCenter = CostCenter::factory()->create();
    $user = User::factory()->create(['cost_center_id' => $costCenter->id]);

    $this->actingAs($user)->post(
        route('audits.quality-checklists.store'),
        qualityChecklistPayload($costCenter->id, '2026-06-28')
    )->assertSessionHasNoErrors();

    $this->actingAs($user)->post(
        route('audits.quality-checklists.store'),
        qualityChecklistPayload($costCenter->id, '2026-06-29')
    )->assertSessionHasNoErrors();

    $this->assertDatabaseCount('quality_checklist', 2);
});

function qualityChecklistPayload(int $costCenterId, string $date): array
{
    return [
        'cost_center_id' => $costCenterId,
        'checklist_date' => $date,
        'temperature_start' => 19.5,
        'temperature_end' => 21.2,
        'smoke_detector' => true,
        'extingisher_expiration_date' => '2027-01-15',
        'last_plague_control' => '2026-06-01',
        'last_bathroom_sanitation' => '2026-06-27',
        'humidity_percentage' => 48.5,
        'observations' => 'Everything is in order.',
    ];
}
