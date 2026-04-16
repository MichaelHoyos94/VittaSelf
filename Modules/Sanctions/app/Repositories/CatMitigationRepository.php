<?php
namespace Modules\Sanctions\Repositories;
use Modules\Sanctions\Models\CatMitigation;
class CatMitigationRepository
{
    public function getAll()
    {
        return CatMitigation::where('active', true)->get();
    }
    public function store(array $data)
    {
        return CatMitigation::create($data);
    }
    public function update($id, array $data)
    {
        $mitigation = CatMitigation::findOrFail($id);
        $mitigation->update($data);
        return $mitigation;
    }
    public function delete($id)
    {
        $mitigation = CatMitigation::findOrFail($id);
        $mitigation->delete();
        return true;
    }
    public function activate($id)
    {
        $mitigation = CatMitigation::findOrFail($id);
        $mitigation->active = true;
        $mitigation->save();
        return $mitigation;
    }
    public function inactivate($id)
    {
        $mitigation = CatMitigation::findOrFail($id);
        $mitigation->active = false;
        $mitigation->save();
        return $mitigation;
    }
}
