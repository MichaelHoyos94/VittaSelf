<?php

namespace App\Services;

use App\Exceptions\ProductAlredyInCartException;
use App\Exceptions\ProductNotInCartException;
use App\Repositories\CartRepository;

class CartService
{
    public function __construct(private CartRepository $repository) {}

    public function create($userId)
    {
        return $this->repository->create($userId);
    }

    public function getByUserId($userId)
    {
        return $this->repository->getByUserId($userId);
    }

    public function addProduct($userId, $productId)
    {
        $cart = $this->repository->getByUserId($userId);
        if ($cart->products->contains('id', $productId)) {
            throw new ProductAlredyInCartException;
        } else {
            $cart->products()->attach($productId, ['quantity' => 1]);
        }
    }

    public function increseQuantity($userId, $productId)
    {
        $cart = $this->repository->getByUserId($userId);
        $product = $cart->products()->where('products.id', $productId)->first();
        if ($product) {
            $product->pivot->quantity += 1;
            $product->pivot->save();
        } else {
            throw new ProductNotInCartException;
        }
    }

    public function decreseQuantity($userId, $productId)
    {
        $cart = $this->repository->getByUserId($userId);
        $product = $cart->products()->where('products.id', $productId)->first();
        if ($product) {
            $product->pivot->quantity -= 1;
            $product->pivot->save();
        } else {
            throw new ProductNotInCartException;
        }
    }

    public function removeProduct($userId, $productId)
    {
        $cart = $this->repository->getByUserId($userId);
        if ($cart->products->contains('id', $productId)) {
            $cart->products()->detach($productId);
        } else {
            throw new ProductNotInCartException;
        }
    }

    public function emptyCart($userId)
    {
        $cart = $this->repository->getByUserId($userId);
        $cart->products()->detach();
    }
}
