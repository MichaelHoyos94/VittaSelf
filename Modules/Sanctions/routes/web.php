<?php

use Illuminate\Support\Facades\Route;
use Modules\Sanctions\Http\Controllers\SanctionsController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('sanctions', SanctionsController::class)->names('sanctions');
});
