<?php

namespace App\Services;

use App\Repositories\OrderRepository;
use Illuminate\Support\Facades\DB;

class OrderService
{
    public function __construct(private OrderRepository $repository, private CartService $cartService) {}
    public function create($data)
    {
        $subtotal = 0;
        foreach ($data['products'] as $product) {
            $subtotal += $product['pivot']['quantity'] * $product['price'];
        }
        $data['subtotal'] = $subtotal;
        $data['total'] = $subtotal;
        $order = $this->repository->create($data);
        if ($order) {
            $this->cartService->emptyCart($data['user_id']);
        }
        return $order;
    }
    public function getByUserId($userId)
    {
        return $this->repository->getByUserId($userId);
    }
}
