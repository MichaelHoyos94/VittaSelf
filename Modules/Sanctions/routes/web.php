<?php

use Illuminate\Support\Facades\Route;
use Modules\Sanctions\Http\Controllers\DisciplinaryCasesController;
use Modules\Sanctions\Http\Controllers\ResolutionsController;
use Modules\Sanctions\Http\Controllers\SanctionEvidencesController;
use Modules\Sanctions\Http\Controllers\SanctionsController;
use Modules\Sanctions\Http\Controllers\SettingsController;

Route::prefix('sanctions')->middleware(['auth', 'verified'])->as('sanctions.')->group(function () {

    // ============================================== Disciplinary Cases ===================================================== //
    Route::get('/disciplinary-cases', [DisciplinaryCasesController::class, 'index'])->name('disciplinary-cases.index');
    Route::post('/disciplinary-cases', [DisciplinaryCasesController::class, 'store'])->name('disciplinary-cases.store');
    Route::get('/manage-case/{id}', [DisciplinaryCasesController::class, 'manageCase'])->name('manage-case');
    Route::post('/progress-case/{id}', [DisciplinaryCasesController::class, 'progressCase'])->name('progress-case');
    Route::post('/assign-case/{id}', [DisciplinaryCasesController::class, 'assignCase'])->name('assign-case');

    // =============================================== EVIDENCES ========================================================= //
    Route::post('/disciplinary-cases/{disciplinaryCaseId}/evidences', [SanctionEvidencesController::class, 'store'])->name('evidences.store');
    // =============================================== RESOLUTIONS ========================================================= //
    Route::get('/resolutions', [ResolutionsController::class, 'index'])->name('resolutions.index');
    Route::post('/resolutions', [ResolutionsController::class, 'store'])->name('resolutions.store');
    Route::get('/resolutions/{id}', [ResolutionsController::class, 'show'])->name('resolutions.show');
    Route::get('/resolutions/{id}/edit', [ResolutionsController::class, 'edit'])->name('resolutions.edit');
    Route::put('/resolutions/{id}', [ResolutionsController::class, 'update'])->name('resolutions.update');
    Route::delete('/resolutions/{id}', [ResolutionsController::class, 'destroy'])->name('resolutions.destroy');

    // ============================================== Settings ================================================================ //
    //Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
    Route::prefix('/settings')->middleware(['auth', 'verified'])->as('settings.')->group(function() {
        Route::get('/', [SettingsController::class, 'index'])->name('index');
        Route::get('/policies', [SettingsController::class, 'policies'])->name('policies.index');
        Route::post('/policies', [SettingsController::class, 'storePolicy'])->name('policies.store');
        Route::put('/policies/{id}', [SettingsController::class, 'updatePolicy'])->name('policies.update');
        Route::put('/policies/{id}/activate', [SettingsController::class, 'activatePolicy'])->name('policies.activate');
        Route::put('/policies/{id}/inactivate', [SettingsController::class, 'inactivatePolicy'])->name('policies.inactivate');

        Route::get('/compliance-sources', [SettingsController::class, 'complianceSources'])->name('compliance-sources.index');
        Route::post('/compliance-sources', [SettingsController::class, 'storeComplianceSource'])->name('compliance-sources.store');
        Route::put('/compliance-sources/{id}', [SettingsController::class, 'updateComplianceSource'])->name('compliance-sources.update');
        Route::put('/compliance-sources/{id}/activate', [SettingsController::class, 'activateComplianceSource'])->name('compliance-sources.activate');
        Route::put('/compliance-sources/{id}/inactivate', [SettingsController::class, 'inactivateComplianceSource'])->name('compliance-sources.inactivate');

        Route::get('/mitigations', [SettingsController::class, 'mitigations'])->name('mitigations.index');
        Route::post('/mitigations', [SettingsController::class, 'storeMitigation'])->name('mitigations.store');
        Route::put('/mitigations/{id}', [SettingsController::class, 'updateMitigation'])->name('mitigations.update');
        Route::put('/mitigations/{id}/activate', [SettingsController::class, 'activateMitigation'])->name('mitigations.activate');
        Route::put('/mitigations/{id}/inactivate', [SettingsController::class, 'inactivateMitigation'])->name('mitigations.inactivate');
    });
});
