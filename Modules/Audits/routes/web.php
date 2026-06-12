<?php

use Illuminate\Support\Facades\Route;
use Modules\Audits\Http\Controllers\AuditsController;
use Modules\Audits\Http\Controllers\QualityChecklistsController;

Route::prefix('audits')->middleware(['auth', 'verified'])->as('audits.')->group(function (){
    Route::post('/quality-checklists/audit', [AuditsController::class, 'store'])->name('quality-checklists.audit');
    // ================================================== Quality Checklists ==================================================
    Route::get('/quality-checklists', [QualityChecklistsController::class, 'index'])->name('quality-checklists.index');
    Route::post('/quality-checklists', [QualityChecklistsController::class, 'store'])->name('quality-checklists.store');
});
