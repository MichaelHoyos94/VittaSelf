<?php

use Illuminate\Support\Facades\Route;
use Modules\Audits\Http\Controllers\AuditsController;

Route::prefix('audits')->group(function() {
    Route::get('/', [AuditsController::class, 'index'])->name('audits.index');
});
