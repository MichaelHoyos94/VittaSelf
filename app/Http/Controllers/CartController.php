<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $userId = auth()->user()->id;
        $cart = $this->service->getByUserId($userId);
        return Inertia::render('Cart/Cart')->with([
            'cart' => $cart
        ]);
    }
    public function removeProduct() {
        $userId = auth()->user()->id;
        try {
            $this->service->removeProduct($userId, request('product_id'));
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
        return back()->with('success', 'Product removed from cart.');
    }
    public function increseProduct() {
        try {
            $this->service->increseQuantity(auth()->user()->id, request('product_id'));
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
        return back()->with('success', 'Product quantity increased.');
    }
    public function decreseProduct() {
        try {
            $this->service->decreseQuantity(auth()->user()->id, request('product_id'));
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
        return back()->with('success', 'Product quantity decresed.');
    }
    public function emptyCart() {
        try {
            $this->service->emptyCart(auth()->user()->id);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
        return back()->with('success', 'Cart emptied.');
    }
}
