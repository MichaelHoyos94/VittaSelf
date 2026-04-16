<?php
namespace Modules\Sanctions\Repositories;
use Modules\Sanctions\Models\CatSanction;
class CatSanctionRepository
{
    public function getAll()
    {
        return CatSanction::where('active', true)->get();
    }
    public function store(array $data)
    {
        return CatSanction::create($data);
    }
    public function update($id, array $data)
    {
        $sanction = CatSanction::findOrFail($id);
        $sanction->update($data);
        return $sanction;
    }
    public function delete($id)
    {
        $sanction = CatSanction::findOrFail($id);
        $sanction->delete();
        return true;
    }
    public function activate($id)
    {
        $sanction = CatSanction::findOrFail($id);
        $sanction->active = true;
        $sanction->save();
        return $sanction;
    }
    public function inactivate($id)
    {
        $sanction = CatSanction::findOrFail($id);
        $sanction->active = false;
        $sanction->save();
        return $sanction;
    }
}
