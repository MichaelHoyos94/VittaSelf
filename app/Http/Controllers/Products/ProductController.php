<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Services\ProductService;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct(private ProductService $service) {}

    public function index(Request $request)
    {
        $search = $request->input('search');
        $products = $this->service->getAll($search);

        return Inertia::render('Products/Index')->with([
            'products' => $products,
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

    public function store(StoreProductRequest $request)
    {
        $this->service->create($request->validated());

        return redirect()->route('products.manage-products')
            ->with('success', 'Product created successfully.');
    }

    public function update(UpdateProductRequest $request, $id)
    {
        $this->service->update($id, $request->validated());

        return redirect()->route('products.manage-products')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy($id)
    {
        try {
            $this->service->delete($id);
        } catch (QueryException) {
            return redirect()->route('products.manage-products')
                ->with('error', 'The product cannot be deleted because it is being used.');
        }

        return redirect()->route('products.manage-products')
            ->with('success', 'Product deleted successfully.');
    }
}
