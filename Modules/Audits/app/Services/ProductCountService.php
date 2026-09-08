<?php

namespace Modules\Audits\Services;

use Illuminate\Support\Facades\DB;
use Modules\Audits\Repositories\ProductCountRepository;
use Modules\Audits\Repositories\ProductQuantityRepository as RepositoriesProductQuantityRepository;

class ProductCountService
{
    public function __construct(private ProductCountRepository $repository, private RepositoriesProductQuantityRepository $productQuantityRepository) {}

    public function getAll($search) {
        return $this->repository->getAll($search);
    }

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            $productCount = $this->repository->create($data);
            foreach ($data['products'] as $product) {
                $product['product_count_id'] = $productCount->id;
                $this->productQuantityRepository->create($product);
            }
            return $productCount;
        });
    }

    public function getById($id) {
        return $this->repository->getById($id);
    }
}
