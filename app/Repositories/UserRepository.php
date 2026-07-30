<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct() {}

    public function getAll($search, $perPage = 10, $sortField = 'created_at', $sortDirection = 'desc')
    {
        return User::query()
            ->role('eui')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('document_number', 'like', "%{$search}%")
                        ->orWhere('eui_code', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create($data)
    {
        $user = new User($data);
        $user->assignRole('eui');
        return $user->save();
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
