<?php

namespace App\Services;

use App\Repositories\HumanResourcesRepository;

class HumanResourcesService
{
    public function __construct(private HumanResourcesRepository $repository) {}
    public function getAll($search = null)
    {
        return $this->repository->getAll($search);
    }
    public function create(array $data)
    {
        $role = $data['role'];
        unset($data['role']);
        $user = $this->repository->create($data);
        if ($user) $user->assignRole($role);
        return $user;
    }

    public function update(array $data, int $employeeId) 
    {
        return $this->repository->update($data, $employeeId);
    }
}
