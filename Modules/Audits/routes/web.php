<?php

use Illuminate\Support\Facades\Route;
use Modules\Audits\Http\Controllers\AuditsController;
use Modules\Audits\Http\Controllers\ProductCountController;
use Modules\Audits\Http\Controllers\QualityChecklistsController;

Route::prefix('audits')->middleware(['auth', 'verified'])->as('audits.')->group(function (){

    // ================================================== Audits History ==================================================
    Route::get('/history', [AuditsController::class, 'index'])->name('history.index');

    Route::post('/quality-checklists/audit', [AuditsController::class, 'store'])->name('quality-checklists.audit');
    // ================================================== Quality Checklists ==================================================
    Route::get('/quality-checklists', [QualityChecklistsController::class, 'index'])->name('quality-checklists.index');
    Route::post('/quality-checklists', [QualityChecklistsController::class, 'store'])->name('quality-checklists.store');

    // ================================================== Product Counts ==================================================
    Route::get('/product-counts', [ProductCountController::class, 'index'])->name('product-counts.index');
    Route::get('/product-counts/create', [ProductCountController::class, 'create'])->name('product-counts.create');
    Route::post('/product-counts', [ProductCountController::class, 'store'])->name('product-counts.store');
});
