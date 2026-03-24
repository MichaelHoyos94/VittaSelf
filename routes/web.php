<?php

use App\Http\Controllers\HumanResources\HumanResourcesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('human-resources')->group(function() {
    Route::get('/employees', [HumanResourcesController::class, 'index'])->name('human-resources.index');
    Route::post('/employees', [HumanResourcesController::class, 'store'])->name('human-resources.store');
    Route::put('/employees/{id}', [HumanResourcesController::class, 'update'])->name('human-resources.update');
    Route::delete('/employees/{id}', [HumanResourcesController::class, 'destroy'])->name('human-resources.destroy');
});

require __DIR__.'/auth.php';
