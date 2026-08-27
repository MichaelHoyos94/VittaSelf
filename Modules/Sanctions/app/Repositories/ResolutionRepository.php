<?php

namespace Modules\Sanctions\Repositories;

use Illuminate\Support\Facades\DB;
use Modules\Sanctions\Models\Resolution;

class ResolutionRepository
{
    public function getAll($search, $perPage = 10, $sortBy = 'created_at', $sortDirection = 'desc')
    {
        return Resolution::query()
            ->with([
                'sanctions',
                'mitigations',
                'disciplinaryCase.user',
                'disciplinaryCase.admin',
                'sanctionEnforcements'
            ])
            ->when($search, function ($query, $search) {
                $query->whereHas('disciplinaryCase', function ($q) use ($search) {
                    $q->whereHas('user', function ($q2) use ($search) {
                        $q2->where('name', 'like', "%{$search}%")
                            ->orWhere('eui_code', 'like', "%{$search}%");
                    });
                });
            })
            ->orderBy($sortBy, $sortDirection)
            ->paginate($perPage);
    }
    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            $sanctions = $data['sanctions'] ?? [];
            $mitigations = $data['mitigations'] ?? [];

            unset($data['sanctions'], $data['mitigations']);

            $resolution = Resolution::create($data);

            $resolution->sanctions()->sync($sanctions);
            $resolution->mitigations()->sync($mitigations);

            return $resolution->load(['sanctions', 'mitigations', 'disciplinaryCase', 'sanctionLevel']);
        });
    }
    public function update($id, array $data)
    {
        $resolution = Resolution::findOrFail($id);
        $resolution->update($data);
        return $resolution;
    }
    public function delete($id)
    {
        $resolution = Resolution::findOrFail($id);
        $resolution->delete();
        return true;
    }
}
