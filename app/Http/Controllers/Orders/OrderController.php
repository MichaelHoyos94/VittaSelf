<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Services\CartService;
use App\Services\OrderService;
use Exception;
use Inertia\Inertia;
use Modules\Sanctions\Services\SanctionEnforcementService;

class OrderController extends Controller
{
    public function __construct(
        private OrderService $service,
        private CartService $cartService,
        private SanctionEnforcementService $sanctionEnforcementService
    ) {}
    public function index()
    {
        $orders = $this->service->getAll();
        return Inertia::render('Orders/Index')->with([
            'orders' => $orders,
        ]);
    }
    public function checkout()
    {
        $cart = $this->cartService->getByUserId(auth()->user()->id);
        $user = auth()->user();
        $user->load(['plan.benefits']);
        $sanctions = $this->sanctionEnforcementService->getUserSanctions($user->id);
        return Inertia::render('Orders/Checkout')->with([
            'cart' => $cart,
            'user' => $user,
            'sanctions' => $sanctions,
        ]);
    }
    public function store(OrderRequest $request)
    {
        $validated = $request->validated();
        try {
            $order = $this->service->create($validated, auth()->user());
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to create order: ' . $e->getMessage()]);
        }
        return redirect()->route('orders.my-orders')->with([
            'success' => 'Order created successfully with ID: ',
        ]);
    }
    public function myOrders()
    {
        $userId = auth()->user()->id;
        $orders = $this->service->getByUserId($userId);
        return Inertia::render('Orders/MyOrders')->with([
            'orders' => $orders,
        ]);
    }
}
