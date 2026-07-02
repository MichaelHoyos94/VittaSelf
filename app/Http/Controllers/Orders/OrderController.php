<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Services\CartService;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct(private OrderService $service, private CartService $cartService) {}
    public function checkout()
    {
        $cart = $this->cartService->getByUserId(auth()->user()->id);
        return Inertia::render('Orders/Checkout', compact('cart'))->with([
            'cart' => $cart,
        ]);
    }
    public function create()
    {
        
    }
}
