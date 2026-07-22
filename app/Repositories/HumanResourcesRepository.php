<?php

namespace App\Repositories;

use App\Models\User;

class HumanResourcesRepository
{
    public function getAll($search, $perPage = 10, $sortField = 'created_at', $sortDirection = 'asc')
    {
        $users = User::query()
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage)
            ->withQueryString();
        return $users;
    }
}
