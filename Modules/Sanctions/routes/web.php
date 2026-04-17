<?php

use Illuminate\Support\Facades\Route;
use Modules\Sanctions\Http\Controllers\DisciplinaryCasesController;
use Modules\Sanctions\Http\Controllers\SanctionsController;

Route::prefix('sanctions')->middleware(['auth', 'verified'])->as('sanctions.')->group(function () {

    // ============================================== Disciplinary Cases ===================================================== //
    Route::get('/disciplinary-cases', [DisciplinaryCasesController::class, 'index'])->name('disciplinary-cases.index');
});
