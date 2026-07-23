<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct(private ProductService $service) {}
    public function index(Request $request) {
        $search = $request->input('search');
        $products = $this->service->getAll($search);
        return Inertia::render('Products/Index')->with([
            'products' => $products
        ]);
    }
    public function manageProducts(Request $request)
    {
        $search = $request->input('search');
        $products = $this->service->getAll($search);
        return Inertia::render('Products/ManageProducts')->with([
            'products' => $products,
        ]);
    }
}
