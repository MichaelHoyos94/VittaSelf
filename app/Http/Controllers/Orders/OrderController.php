<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Services\CartService;
use App\Services\OrderService;
use Exception;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct(private OrderService $service, private CartService $cartService) {}
    public function checkout()
    {
        $cart = $this->cartService->getByUserId(auth()->user()->id);
        return Inertia::render('Orders/Checkout')->with([
            'cart' => $cart,
        ]);
    }
    public function store(OrderRequest $request)
    {
        $validated = $request->validated();
        try {
            $order = $this->service->create($validated);
            $orders = $this->service->getByUserId(auth()->user()->id);
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to create order: ' . $e->getMessage()]);
        }
        return redirect()->route('orders.my-orders')->with([
            'orders' => $orders,
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
