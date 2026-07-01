<?php

use App\Models\User;
use Modules\Sanctions\Models\CatCaseStatus;
use Modules\Sanctions\Models\CatComplianceSource;
use Modules\Sanctions\Models\CatMitigation;
use Modules\Sanctions\Models\CatPolicy;
use Modules\Sanctions\Models\CatSanction;
use Modules\Sanctions\Models\CatSanctionLevel;
use Modules\Sanctions\Models\DisciplinaryCase;
use Modules\Sanctions\Models\Resolution;
use Modules\Sanctions\Models\SanctionEnforcement;

it('creates a resolution, progresses the case and applies the selected sanctions', function () {
    $this->withoutExceptionHandling();

    $user = User::factory()->create();
    $admin = User::factory()->create();

    $nextStatus = CatCaseStatus::query()->create([
        'code' => 'RESOLVED',
        'case_status' => 'Resolved',
        'case_status_description' => 'The case has a resolution.',
    ]);

    $initialStatus = CatCaseStatus::query()->create([
        'code' => 'UNDER_REVIEW',
        'case_status' => 'Under review',
        'case_status_description' => 'The case is being reviewed.',
    ]);
    $initialStatus->forceFill(['next_status_id' => $nextStatus->id])->save();

    $policy = CatPolicy::query()->create([
        'code' => 'POL-RESOLUTION-TEST',
        'policy' => 'Resolution test policy',
        'section' => 'Conduct',
        'numeral' => '1.1',
        'description' => 'Policy used by the resolution integration test.',
        'active' => true,
    ]);

    $complianceSource = CatComplianceSource::query()->create([
        'code' => 'INTERNAL_REPORT',
        'source' => 'Internal report',
        'description' => 'Internal report source.',
        'active' => true,
    ]);

    $sanctionLevel = CatSanctionLevel::query()->create([
        'code' => 'LEVEL_ONE',
        'sanction_level' => 'Level one',
        'sanction_level_description' => 'Low severity level.',
    ]);

    $suspendAccount = CatSanction::query()->create([
        'code' => 'SUSPEND_ACCOUNT',
        'sanction' => 'Suspend account',
        'description' => 'Temporarily suspend the user account.',
        'active' => true,
    ]);

    $freezePoints = CatSanction::query()->create([
        'code' => 'FREEZE_POINTS',
        'sanction' => 'Freeze points',
        'description' => 'Temporarily freeze user points.',
        'active' => true,
    ]);

    $mitigation = CatMitigation::query()->create([
        'code' => 'FIRST_INFRACTION',
        'mitigation' => 'First infraction',
        'description' => 'The user has no previous infractions.',
        'active' => true,
    ]);

    $disciplinaryCase = DisciplinaryCase::query()->create([
        'facts_description' => 'The user breached one policy during the audit process.',
        'details' => 'Initial finding',
        'user_id' => $user->id,
        'admin_id' => $admin->id,
        'policy_id' => $policy->id,
        'compliance_source_id' => $complianceSource->id,
        'case_status_id' => $initialStatus->id,
    ]);

    $payload = [
        'resolution_text' => 'The case proceeds and selected sanctions must be applied.',
        'resolution_type' => 'PROCEDE',
        'disciplinary_case_id' => $disciplinaryCase->id,
        'sanction_level_id' => $sanctionLevel->id,
        'sanctions' => [$suspendAccount->id, $freezePoints->id],
        'mitigations' => [$mitigation->id],
    ];

    $response = $this->actingAs($admin)
        ->post(route('sanctions.resolutions.store'), $payload);

    $resolution = Resolution::query()->sole();
    $enforcement = SanctionEnforcement::query()->sole();

    $response
        ->assertRedirect()
        ->assertSessionHas(
            'success',
            "Disciplinary case solved successfully. Resolution ID: {$resolution->id}"
        );

    expect($resolution)
        ->disciplinary_case_id->toBe($disciplinaryCase->id)
        ->sanction_level_id->toBe($sanctionLevel->id)
        ->resolution_text->toBe('The case proceeds and selected sanctions must be applied.');

    expect($disciplinaryCase->fresh()->case_status_id)->toBe($nextStatus->id);
    expect($resolution->sanctions()->pluck('cat_sanctions.id')->all())
        ->toEqualCanonicalizing([$suspendAccount->id, $freezePoints->id]);
    expect($resolution->mitigations()->pluck('cat_mitigations.id')->all())
        ->toEqualCanonicalizing([$mitigation->id]);

    expect($enforcement)
        ->resolution_id->toBe($resolution->id)
        ->user_id->toBe($user->id)
        ->SUSPEND_ACCOUNT->toBeTrue()
        ->FREEZE_POINTS->toBeTrue()
        ->FREEZE_PLAN->toBeFalse()
        ->TERMINATE_ACCOUNT->toBeFalse();
});
