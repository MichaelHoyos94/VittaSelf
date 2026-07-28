<?php

namespace App\Services;

use App\Repositories\ProductRepository;

class ProductService
{
    public function __construct(private ProductRepository $repository) {}
    public function getAll($search = null) {
        return $this->repository->getAll($search);
    }
    public function create(array $data) {}
    public function getById($id) {
        return $this->repository->getById($id);
    }
}
