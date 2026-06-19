<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    public function __construct() {}
    public function getAll() {
        return Product::all();
    }
    public function create(array $data) {}
    public function getById($id) {}
}
