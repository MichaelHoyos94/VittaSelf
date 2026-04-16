<?php
namespace Modules\Sanctions\Repositories;
Use Modules\Sanctions\Models\SanctionEnforcement;

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
}