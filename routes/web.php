<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CashRegisters\CashRegisterController;
use App\Http\Controllers\CostCenterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HumanResources\HumanResourcesController;
use App\Http\Controllers\HumanResources\RolePermissionController;
use App\Http\Controllers\Orders\InternalOrderController;
use App\Http\Controllers\Orders\OrderController;
use App\Http\Controllers\Products\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $user = auth()->user();
    if ($user && $user->hasRole(['administrator', 'super-admin'])) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('products.products.index');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/coming-soon/{feature}', function (string $feature) {
    $features = [
        'inventory-entry' => [
            'title' => 'Inventory Entry',
            'description' => 'We are preparing a simpler way to register incoming inventory and keep every movement clear and organized.',
        ],
        'inventory-transfer' => [
            'title' => 'Inventory Transfer',
            'description' => 'We are building a faster, more reliable experience for transferring inventory between locations.',
        ],
        'my-wallet' => [
            'title' => 'My Wallet',
            'description' => 'Your wallet experience is taking shape. Soon you will be able to view and manage everything from one place.',
        ],
        'my-referrals' => [
            'title' => 'My Referrals',
            'description' => 'We are creating a clear, friendly space where you can follow your referrals and see their progress.',
        ],
    ];

    abort_unless(isset($features[$feature]), 404);

    return Inertia::render('ComingSoon', [
        'feature' => $features[$feature],
    ]);
})->middleware(['auth', 'verified'])->name('coming-soon');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('human-resources')->group(function () {
    Route::get('/employees', [HumanResourcesController::class, 'index'])->name('human-resources.index');
    Route::post('/employees', [HumanResourcesController::class, 'store'])->name('human-resources.store');
    Route::put('/employees/{id}', [HumanResourcesController::class, 'update'])->name('human-resources.update');
    Route::delete('/employees/{id}', [HumanResourcesController::class, 'destroy'])->name('human-resources.destroy');
});

Route::prefix('human-resources/permissions')
    ->middleware(['auth', 'verified'])
    ->as('human-resources.')
    ->group(function () {
        Route::get('/', [RolePermissionController::class, 'index'])
            ->middleware('can:human-resources.roles-view')
            ->name('permissions');
        Route::put('/{role}', [RolePermissionController::class, 'update'])
            ->middleware('can:human-resources.roles-assign')
            ->name('permissions.update');
    });

Route::prefix('customers')->middleware(['auth', 'verified'])->as('customers.')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('index');
    Route::post('/', [UserController::class, 'store'])->name('store');
});

Route::get('/my-referrals', [UserController::class, 'myReferrals'])
    ->middleware(['auth', 'verified'])
    ->name('my-referrals');

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
    Route::get('/web-orders', [OrderController::class, 'index'])->name('web-orders.index');
    Route::get('/internal-orders', [InternalOrderController::class, 'index'])->name('internal-orders.index');
});

Route::get('/my-orders', [OrderController::class, 'myOrders'])->middleware(['auth', 'verified'])->name('my-orders');

Route::prefix('cash-registers-manage')->middleware('auth')->as('cash-register-manage.')->group(function () {
    Route::get('/', [CashRegisterController::class, 'index'])->name('cash-registers.index');
    Route::post('/', [CashRegisterController::class, 'store'])->name('cash-registers.store');
    Route::post('/assign/{cashRegisterId}', [CashRegisterController::class, 'assign'])->name('cash-registers.assign');
    Route::post('/release/{cashRegisterId}', [CashRegisterController::class, 'release'])->name('cash-registers.release');
    Route::delete('/{cashRegisterId}', [CashRegisterController::class, 'destroy'])->name('cash-registers.delete');
});

Route::prefix('cost-centers')->middleware(['auth', 'verified'])->as('cost-centers.')->group(function () {
    Route::get('/', [CostCenterController::class, 'index'])->name('index');
    Route::post('/', [CostCenterController::class, 'store'])->name('store');
    Route::put('/{id}', [CostCenterController::class, 'update'])->name('update');
    Route::delete('/{id}', [CostCenterController::class, 'destroy'])->name('destroy');
});

Route::prefix('my-cash-register')->middleware(['auth', 'verified'])->as('my-cash-register.')->group(function () {
    Route::get('/', [CashRegisterController::class, 'myCashRegister'])->name('index');
    Route::post('/close-cash-register', [CashRegisterController::class, 'closeCashRegister'])->name('close');
    Route::post('/open-cash-register', [CashRegisterController::class, 'openCashRegister'])->name('open');
});

Route::prefix('products')->middleware(['auth', 'verified'])->as('products.')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('products.index');
    Route::get('/manage-products', [ProductController::class, 'manageProducts'])->name('manage-products');
    Route::post('/manage-products', [ProductController::class, 'store'])->name('store');
    Route::put('/manage-products/{id}', [ProductController::class, 'update'])->name('update');
    Route::delete('/manage-products/{id}', [ProductController::class, 'destroy'])->name('destroy');
});

require __DIR__.'/auth.php';
