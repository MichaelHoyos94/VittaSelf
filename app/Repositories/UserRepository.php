<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct(){}

    public function create($data)
    {
        return User::create($data);
    }

    public function getById($id)
    {
        return User::find($id);
    }
}
