<?php

namespace App\Repositories;

use App\Models\User;

class HumanResourcesRepository
{
    public function getAll($search, $perPage = 10, $sortField = 'created_at', $sortDirection = 'asc')
    {
        $users = User::with(['roles', 'costCenter'])
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%");
            })
            ->whereHas('roles', function ($query) {
                $query->where('name', '!=', 'eui');
                $query->where('name', '!=', 'super-admin');
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage)
            ->withQueryString();
        return $users;
    }

    public function create(array $data) {
        return User::create($data);
    }

    public function update(array $data, int $employeeId) {
        $user = User::findOrFail($employeeId);
        $user->update($data);
        return $user;
    }
}
