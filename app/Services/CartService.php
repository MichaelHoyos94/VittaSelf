<?php

namespace App\Services;

use App\Repositories\CartRepository;
use Exception;

class CartService
{
    public function __construct(private CartRepository $repository, private ProductService $productService) {}
    public function create($userId)
    {
        return $this->repository->create($userId);
    }
    public function addProduct($userId, $productId)
    {
        $cart = $this->repository->getByUserId($userId);
        if ($cart->products->contains('id', $productId)) {
            throw new Exception('Product already in cart');
        } else {
            $cart->products()->attach($productId, ['quantity' => 1]);
        }
    }
    public function increseQuantity($userId, $productId)
    {
        $cart = $this->repository->getByUserId($userId);
        $product = $cart->products()->where('id', $productId)->first();
        if ($product) {
            $product->pivot->quantity += 1;
            $product->pivot->save();
        } else {
            throw new Exception('Product not found in cart');
        }
    }
    public function decreseQuantity($userId, $productId)
    {
        $cart = $this->repository->getByUserId($userId);
        $product = $cart->products()->where('id', $productId)->first();
        if ($product) {
            $product->pivot->quantity -= 1;
            $product->pivot->save();
        } else {
            throw new Exception('Product not found in cart');
        }
    }
    public function removeProduct($userId, $productId) {
        $cart = $this->repository->getByUserId($userId);
        if ($cart->products->contains('id', $productId)) {
            $cart->products()->detach($productId);
        } else {
            throw new Exception('Product not found in cart');
        }
    }
    public function emptyCart($userId)
    {
        $cart = $this->repository->getByUserId($userId);
        $cart->products()->detach();
    }
}
