<?php

namespace App\Repositories;

use App\Models\Order;
use Illuminate\Support\Facades\DB;

class OrderRepository
{
    public function __construct() {}
    public function getAll() {}
    public function create($data) {
        return DB::transaction(function () use ($data) {
            $products = $data['products'];
            unset($data['products']);
            $formatProducts = [];
            foreach ($products as $product) {
                $formatProducts[$product['id']] = [
                    'quantity' => $product['pivot']['quantity'],
                    'unit_price' => $product['price'],
                    'discount' => 0,
                    'subtotal' => $product['pivot']['quantity'] * $product['price'],
                    'total' => $product['pivot']['quantity'] * $product['price'],
                ];
            }
            $order = Order::create($data);
            $order->products()->attach($formatProducts);
            return $order;
        });
    }
    public function getById($id) {}
    public function getByUserId($userId)
    {
        return Order::where('user_id', $userId)->get();
    }
}
