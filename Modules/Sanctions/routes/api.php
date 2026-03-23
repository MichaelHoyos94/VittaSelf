<?php

use Illuminate\Support\Facades\Route;
use Modules\Sanctions\Http\Controllers\SanctionsController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('sanctions', SanctionsController::class)->names('sanctions');
});
