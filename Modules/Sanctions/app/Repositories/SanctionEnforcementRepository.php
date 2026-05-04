<?php

namespace Modules\Sanctions\Repositories;

use Modules\Sanctions\Models\SanctionEnforcement;

class SanctionEnforcementRepository
{
    public function getAll()
    {
        return SanctionEnforcement::all();
    }
    public function create(array $data)
    {
        return SanctionEnforcement::create($data);
    }
    public function update($id, array $data)
    {
        $enforcement = SanctionEnforcement::findOrFail($id);
        $enforcement->update($data);
        return $enforcement;
    }
    public function delete($id)
    {
        $enforcement = SanctionEnforcement::findOrFail($id);
        $enforcement->delete();
        return true;
    }
    public function getUserSanctions($userId)
    {
        return SanctionEnforcement::query()
            ->where('user_id', $userId)
            ->whereNull('deleted_at')
            ->where('applied_at', '<=', now())
            ->where(function ($query) {
                $query->whereNull('lifted_at')
                    ->orWhere('lifted_at', '>', now());
            })
            ->get();
    }
}
