<?php

use Illuminate\Support\Facades\Route;
use Modules\Audits\Http\Controllers\AuditsController;
use Modules\Audits\Http\Controllers\CashRegisterClosureController;
use Modules\Audits\Http\Controllers\ProductCountController;
use Modules\Audits\Http\Controllers\QualityChecklistsController;

Route::prefix('audits')->middleware(['auth', 'verified'])->as('audits.')->group(function () {

    // ================================================== Audits History ==================================================
    Route::get('/history', [AuditsController::class, 'index'])->name('history.index');

    Route::post('/quality-checklists/audit', [AuditsController::class, 'storeQualityChecklistAudit'])->name('quality-checklists.audit');
    Route::post('/product-counts/audit', [AuditsController::class, 'storeProductCountAudit'])->name('product-counts.audit');
    Route::post('/cash-register-closure/audit', [AuditsController::class, 'storeCashRegisterClosureAudit'])->name('cash-register-closure.audit');
    Route::get('/download-product-count-audit/{id}', [AuditsController::class, 'downloadProductCountAuditReport'])->name('product-counts.audit.download');
    Route::get('/download-quality-checklist-audit/{id}', [AuditsController::class, 'downloadQualityChecklistAuditReport'])->name('quality-checklists.audit.download');
    // ================================================== Quality Checklists ==================================================
    Route::get('/quality-checklists', [QualityChecklistsController::class, 'index'])->name('quality-checklists.index');
    Route::post('/quality-checklists', [QualityChecklistsController::class, 'store'])->name('quality-checklists.store');

    // ================================================== Product Counts ==================================================
    Route::get('/product-counts', [ProductCountController::class, 'index'])->name('product-counts.index');
    Route::get('/product-counts/create', [ProductCountController::class, 'create'])->name('product-counts.create');
    Route::post('/product-counts', [ProductCountController::class, 'store'])->name('product-counts.store');
    Route::get('/product-counts/details/{id}', [ProductCountController::class, 'show'])->name('product-counts.show');

    // ================================================== Cash Register Closings ==========================================
    Route::prefix('cash-register-closures')->middleware(['auth', 'verified'])->as('cash-register-closures.')->group(function () {
        Route::get('/', [CashRegisterClosureController::class, 'index'])->name('index');
        Route::post('/', [CashRegisterClosureController::class, 'store'])->name('store');
        Route::get('/{cashRegisterClosureId}', [CashRegisterClosureController::class, 'show'])->name('show');
    });
});