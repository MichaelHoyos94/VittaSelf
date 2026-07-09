<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Services\InternalOrderService;
use App\Services\ProductService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InternalOrderController extends Controller
{
    public function __construct(private InternalOrderService $service, private UserService $userService, private ProductService $productService) {}
    public function store($data) {}
    public function create(Request $request) {
        $userToOrder = null;
        if ($request->filled('eui_code')) {
            $userToOrder = $this->userService->getByEuiCode($request->eui_code);
        }
        $products = $this->productService->getAll();
        return Inertia::render('Orders/Create')->with([
            'userToOrder' => $userToOrder,
            'products' => $products,
        ]);
    }
    public function getAll() {}
}
