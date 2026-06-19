<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\ProductQuantity;

class ProductQuantityRepository {
    public function __construct() {}
    public function getAll() {

    }
    public function create(array $data) {
        return ProductQuantity::create($data);
    }
}