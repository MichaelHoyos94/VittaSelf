<?php

namespace Modules\Audits\Services;

use Modules\Audits\Repositories\ProductCountRepository;

class ProductCountService
{
    public function __construct(private ProductCountRepository $repository) {}

    public function create(array $data)
    {
        return $this->repository->create($data);
    }
}
