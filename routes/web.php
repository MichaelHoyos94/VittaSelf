<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CashRegisterClosureController;
use App\Http\Controllers\CashRegisters\CashRegisterController;
use App\Http\Controllers\HumanResources\HumanResourcesController;
use App\Http\Controllers\Orders\InternalOrderController;
use App\Http\Controllers\Orders\OrderController;
use App\Http\Controllers\Products\ProductController;
use App\Http\Controllers\ProfileController;
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
    Route::post('/create-internal-order', [InternalOrderController::class, 'store'])->name('internal-orders.store');
    Route::get('/my-orders', [OrderController::class, 'myOrders'])->name('my-orders');
    Route::get('/web-orders', [OrderController::class, 'index'])->name('web-orders.index');
    Route::get('/internal-orders', [InternalOrderController::class, 'index'])->name('internal-orders.index');
});

Route::prefix('cash-registers-manage')->middleware('auth')->as('cash-register-manage.')->group(function () {
    Route::get('/', [CashRegisterController::class, 'index'])->name('cash-registers.index');
    Route::post('/', [CashRegisterController::class, 'store'])->name('cash-registers.store');
    Route::post('/assign/{cashRegisterId}', [CashRegisterController::class, 'assign'])->name('cash-registers.assign');
    Route::post('/release/{cashRegisterId}', [CashRegisterController::class, 'release'])->name('cash-registers.release');
    Route::delete('/delete', [CashRegisterController::class, 'delete'])->name('cash-registers.delete');
});

Route::prefix('products')->middleware(['auth', 'verified'])->as('products.')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('products.index');
});

require __DIR__.'/auth.php';