<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct() {}

    public function getAll() {
        return User::all();
    }

    public function create($data)
    {
        return User::create($data);
    }

    public function getById($id)
    {
        return User::find($id);
    }

    public function getByEuiCode($euiCode)
    {
        return User::with('plan')->where('eui_code', $euiCode)->first();
    }
}
