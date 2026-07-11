<?php

namespace App\Repositories;

use App\Models\Cart;

class CartRepository
{
    public function __construct() {}
    public function create($userId) {}
    public function getById($id) {}
    public function getByUserId($userId) {
        return Cart::with('products')->where('user_id', $userId)->first();
    }
}
