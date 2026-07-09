<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\HumanResources\HumanResourcesController;
use App\Http\Controllers\Orders\InternalOrderController;
use App\Http\Controllers\Orders\OrderController;
use App\Http\Controllers\Products\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\InternalOrder;
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

Route::prefix('carts')->middleware('auth')->as('carts.')->group(function () {
    Route::get('/my-cart', [CartController::class, 'myCart'])->name('my-cart');
    Route::post('/add-product', [CartController::class, 'addProduct'])->name('add-product');
    Route::post('/increse-product', [CartController::class, 'increseProduct'])->name('increse-product');
    Route::post('/decrese-product', [CartController::class, 'decreseProduct'])->name('decrese-product');
    Route::post('/removeProduct', [CartController::class, 'removeProduct'])->name('remove-product');
    Route::delete('/emptyCart', [CartController::class, 'emptyCart'])->name('empty-cart');
});

Route::prefix('orders')->middleware('auth')->as('orders.')->group(function () {
    Route::get('/create-order', [InternalOrderController::class, 'create'])->name('internal-orders.create');
    Route::get('/checkout', [OrderController::class, 'checkout'])->name('checkout');
    Route::post('/', [OrderController::class, 'store'])->name('store');
    Route::get('/my-orders', [OrderController::class, 'myOrders'])->name('my-orders');
});

Route::prefix('products')->middleware(['auth', 'verified'])->as('products.')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('products.index');
});

require __DIR__.'/auth.php';
