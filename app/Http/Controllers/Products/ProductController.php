<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct(private ProductService $service) {}
    public function index() {
        $products = $this->service->getAll();
        return Inertia::render('Products/Index')->with([
            'products' => $products
        ]);
    }
}
