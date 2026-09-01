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
            ->with('representative:id,name,last_name,eui_code')
            ->withCount([
                'representedUsers' => fn ($query) => $query->role('eui'),
            ])
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
        return User::create($data);
    }

    public function update($user)
    {
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

    public function getRepresentativeByEuiCode(string $euiCode): ?User
    {
        return User::query()
            ->role('eui')
            ->where('eui_code', $euiCode)
            ->first();
    }

    public function getRepresentativeCandidateByEuiCode(string $euiCode): ?User
    {
        return User::withTrashed()
            ->where('eui_code', $euiCode)
            ->first();
    }

    public function getRepresentedUsers(User $user)
    {
        return User::query()
            ->role('eui')
            ->with('plan:id,name')
            ->where('representative_id', $user->id)
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();
    }

    public function generateNextEuiCode(): string
    {
        $lastUser = User::query()
            ->whereNotNull('eui_code')
            ->orderByDesc('eui_code')
            ->lockForUpdate()
            ->first();

        $nextNumber = $lastUser
            ? $this->extractNumber($lastUser->eui_code) + 1
            : 1;

        return sprintf('col%05d', $nextNumber);
    }

    private function extractNumber(string $euiCode): int
    {
        return (int) preg_replace('/\D/', '', $euiCode);
    }
}
