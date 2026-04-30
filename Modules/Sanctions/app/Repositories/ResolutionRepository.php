<?php
namespace Modules\Sanctions\Repositories;

use Illuminate\Support\Facades\DB;
use Modules\Sanctions\Models\Resolution;

class ResolutionRepository
{
    public function getAll()
    {
        return Resolution::all();
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
