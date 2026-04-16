<?php
namespace Modules\Sanctions\Repositories;
Use Modules\Sanctions\Models\CatPolicy;
class CatPolicyRepository
{
    public function getAll()
    {
        return CatPolicy::where('active', true)->get();
    }
    public function create(array $data)
    {
        return CatPolicy::create($data);
    }
    public function update($id, array $data)
    {
        $policy = CatPolicy::findOrFail($id);
        $policy->update($data);
        return $policy;
    }
    public function delete($id)
    {
        $policy = CatPolicy::findOrFail($id);
        $policy->delete();
        return true;
    }
    public function activate($id)
    {
        $policy = CatPolicy::findOrFail($id);
        $policy->active = true;
        $policy->save();
        return $policy;
    }
    public function inactivate($id)
    {
        $policy = CatPolicy::findOrFail($id);
        $policy->active = false;
        $policy->save();
        return $policy;
    }
}