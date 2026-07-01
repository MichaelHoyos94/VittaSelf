<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function __construct(private CartService $service) {}
    public function create($userId) {}
    public function addProduct(Request $request) {
        $userId = auth()->user()->id;
        $productId = $request['product_id'];
        try {
            $this->service->addProduct($userId, $productId);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
        return back()->with('success', 'Product added to cart.');
    }
    public function myCart() {
        
    }
    public function removeProduct() {}
    public function increseProduct() {}
    public function decreseProduct() {}
    public function emptyCart() {}
}
