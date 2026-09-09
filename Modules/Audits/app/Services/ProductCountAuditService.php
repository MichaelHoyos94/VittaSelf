<?php

namespace Modules\Audits\Services;

use Modules\Audits\Repositories\ProductCountAuditRepository;

class ProductCountAuditService{
    public function __construct(private ProductCountAuditRepository $repository) {}
    public function getAll($search){
        return $this->repository->getAll($search);
    }
    public function create(array $data){
        return $this->repository->create($data);
    }
    public function getById($id){
        return $this->repository->getById($id);
    }
}