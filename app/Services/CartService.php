<?php

namespace App\Services;

use App\Repositories\CartProductRepository;
use App\Repositories\CartRepository;

class CartService
{
    public function __construct(private CartRepository $repository, private CartProductRepository $cartProductRepository) {}
    public function create($userId)
    {
        return $this->repository->create($userId);
    }
    public function addProduct($data)
    {
        #TODO
    }
    public function increseQuantity() {}
    public function decreseQuantity() {}
    public function removeProduct($cartId, $productId) {}
    public function emptyCart() {}
}
