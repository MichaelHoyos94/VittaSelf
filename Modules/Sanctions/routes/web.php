<?php

use Illuminate\Support\Facades\Route;
use Modules\Sanctions\Http\Controllers\DisciplinaryCasesController;
use Modules\Sanctions\Http\Controllers\ResolutionsController;
use Modules\Sanctions\Http\Controllers\SanctionsController;
use Modules\Sanctions\Http\Controllers\SettingsController;

Route::prefix('sanctions')->middleware(['auth', 'verified'])->as('sanctions.')->group(function () {

    // ============================================== Disciplinary Cases ===================================================== //
    Route::get('/disciplinary-cases', [DisciplinaryCasesController::class, 'index'])->name('disciplinary-cases.index');
    Route::post('/disciplinary-cases', [DisciplinaryCasesController::class, 'store'])->name('disciplinary-cases.store');
    Route::get('/manage-case/{id}', [DisciplinaryCasesController::class, 'manageCase'])->name('manage-case');
    Route::post('/progress-case/{id}', [DisciplinaryCasesController::class, 'progressCase'])->name('progress-case');

    // =============================================== RESOLUTIONS ========================================================= //
    Route::get('/resolutions', [ResolutionsController::class, 'index'])->name('resolutions.index');
    Route::post('/resolutions', [ResolutionsController::class, 'store'])->name('resolutions.store');
    Route::get('/resolutions/{id}', [ResolutionsController::class, 'show'])->name('resolutions.show');
    Route::get('/resolutions/{id}/edit', [ResolutionsController::class, 'edit'])->name('resolutions.edit');
    Route::put('/resolutions/{id}', [ResolutionsController::class, 'update'])->name('resolutions.update');
    Route::delete('/resolutions/{id}', [ResolutionsController::class, 'destroy'])->name('resolutions.destroy');

    // ============================================== Settings ================================================================ //
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
});
