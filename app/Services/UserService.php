<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private UserRepository $userRepository){}

    public function create($data)
    {
        return $this->userRepository->create($data);
    }

    public function getById($id)
    {
        return $this->userRepository->getById($id);
    }
    public function getByEuiCode($euiCode)
    {
        return $this->userRepository->getByEuiCode($euiCode);
    }
}
