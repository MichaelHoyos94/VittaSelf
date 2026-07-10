<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\InternalOrderRequest;
use App\Services\InternalOrderService;
use App\Services\ProductService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InternalOrderController extends Controller
{
    public function __construct(private InternalOrderService $service, private UserService $userService, private ProductService $productService) {}
    public function store(InternalOrderRequest $request) {
        $data = $request->validated();
        $data['commercial_agent_id'] = auth()->user()->id;
        $data['cost_center_id'] = auth()->user()->cost_center_id;
        $order = $this->service->create($data);
        return redirect()->route('orders.internal-orders.index')->with('success', 'Internal order created successfully.');
    }
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
    public function index() {
        $internalOrders = $this->service->getAll();
        return Inertia::render('Orders/InternalOrders')->with([
            'internalOrders' => $internalOrders,
        ]);
    }
}
