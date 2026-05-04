<?php

namespace Modules\Sanctions\Services;
use Modules\Sanctions\Repositories\CatPolicyRepository;
class CatPolicyService
{
    public function __construct(protected CatPolicyRepository $repository){}
    public function getAll()
    {
        return $this->repository->getAll();
    }
}