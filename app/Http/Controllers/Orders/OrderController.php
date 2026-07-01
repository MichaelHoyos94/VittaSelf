<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct(private OrderService $service) {}
    public function checkout()
    {
        return Inertia::render('Orders/Checkout');
    }
    public function create()
    {
        
    }
}
