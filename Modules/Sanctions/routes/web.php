<?php

use Illuminate\Support\Facades\Route;
use Modules\Sanctions\Http\Controllers\DisciplinaryCasesController;
use Modules\Sanctions\Http\Controllers\SanctionsController;
use Modules\Sanctions\Http\Controllers\SettingsController;

Route::prefix('sanctions')->middleware(['auth', 'verified'])->as('sanctions.')->group(function () {

    // ============================================== Disciplinary Cases ===================================================== //
    Route::get('/disciplinary-cases', [DisciplinaryCasesController::class, 'index'])->name('disciplinary-cases.index');
    Route::post('/disciplinary-cases', [DisciplinaryCasesController::class, 'store'])->name('disciplinary-cases.store');
    Route::get('/manage-case/{id}', [DisciplinaryCasesController::class, 'manageCase'])->name('manage-case');

    // ============================================== Settings ================================================================ //
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
});
