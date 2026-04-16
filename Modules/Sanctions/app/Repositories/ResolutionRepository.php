<?php
namespace Modules\Sanctions\Repositories;
use Modules\Sanctions\Models\Resolution;
class ResolutionRepository
{
    public function getAll()
    {
        return Resolution::where('active', true)->get();
    }
    public function create(array $data)
    {
        return Resolution::create($data);
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
