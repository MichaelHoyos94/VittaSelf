<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\InternalOrderRequest;
use App\Services\CashRegisterService;
use App\Services\InternalOrderService;
use App\Services\ProductService;
use App\Services\UserService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Sanctions\Services\SanctionEnforcementService;

class InternalOrderController extends Controller
{
    public function __construct(
        private InternalOrderService $service,
        private UserService $userService,
        private ProductService $productService,
        private CashRegisterService $cashRegisterService,
        private SanctionEnforcementService $sanctionService,
    ) {}
    public function store(InternalOrderRequest $request)
    {
        $data = $request->validated();
        $data['commercial_agent_id'] = auth()->user()->id;
        $data['cost_center_id'] = auth()->user()->cost_center_id;
        try {
            $order = $this->service->create($data);
            if ($order) {
                $this->cashRegisterService->addCash(auth()->user()->id, $order->total, $order->payment_method);
            }
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create order: ' . $e->getMessage());
        }
        return redirect()->route('orders.internal-orders.index')->with('success', 'Internal order created successfully with number: ' . $order->order_number);
    }
    public function create(Request $request)
    {
        $commercialAgent = auth()->user();
        $commercialAgent->load(['cashRegister']);
        if(!$commercialAgent->cashRegister || !$commercialAgent->cashRegister->is_open) return redirect()->route('my-cash-register.index')->with([
            'success' => 'You must open your cash register first.'
        ]);
        $userToOrder = null;
        if ($request->filled('eui_code')) {
            $userToOrder = $this->userService->getByEuiCode($request->eui_code);
            if ($userToOrder) {
                $userToOrder->load(['plan.benefits']);
                $sanctions = $this->sanctionService->getUserSanctions($userToOrder->id);
            }
        }
        $products = $this->productService->getAll();
        return Inertia::render('Orders/Create')->with([
            'userToOrder' => $userToOrder,
            'products' => $products,
            'sanctions' => $userToOrder ? $sanctions : [],
            'plan' => $userToOrder?->plan,
        ]);
    }
    public function index(Request $request)
    {
        $search = $request->input('search');
        $internalOrders = $this->service->getAll($search);
        return Inertia::render('Orders/InternalOrders')->with([
            'internalOrders' => $internalOrders,
        ]);
    }
}
