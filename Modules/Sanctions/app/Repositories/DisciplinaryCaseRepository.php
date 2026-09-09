<?php

namespace Modules\Sanctions\Repositories;

use Modules\Sanctions\Models\DisciplinaryCase;

class DisciplinaryCaseRepository
{
    public function getAll($search, $perPage = 10, $sortField = 'created_at', $sortDirection = 'desc')
    {
        return DisciplinaryCase::query()
            ->with(['user', 'policy', 'admin', 'caseStatus'])
            ->when($search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('eui_code', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage);
    }

    public function getByUserId($userId, $perPage = 10, $sortField = 'created_at', $sortDirection = 'desc')
    {
        return DisciplinaryCase::with(['user', 'policy', 'admin', 'caseStatus'])
            ->where('user_id', $userId)
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage);
    }

    public function getById($id)
    {
        return DisciplinaryCase::with([
            'user',
            'policy',
            'admin',
            'caseStatus',
            'complianceSource',
            'sanctionEvidences',
            'userEvidences',
        ])->findOrFail($id);
    }

    public function create(array $data)
    {
        return DisciplinaryCase::create($data);
    }

    public function update($id, array $data)
    {
        $disciplinaryCase = DisciplinaryCase::findOrFail($id);
        $disciplinaryCase->update($data);

        return $disciplinaryCase;
    }

    public function delete($id)
    {
        $disciplinaryCase = DisciplinaryCase::findOrFail($id);
        $disciplinaryCase->delete();

        return true;
    }

    public function save($disciplinaryCase)
    {
        $disciplinaryCase->save();

        return $disciplinaryCase->fresh();
    }
}
