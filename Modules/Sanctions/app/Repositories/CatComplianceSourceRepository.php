<?php
namespace Modules\Sanctions\Repositories;
use Modules\Sanctions\Models\CatComplianceSource;

class CatComplianceSourceRepository
{
    public function getAll()
    {
        return CatComplianceSource::all();
    }

    public function create($data)
    {
        return CatComplianceSource::create($data);
    }

    public function activate($id)
    {
        $complianceSource = CatComplianceSource::find($id);
        $complianceSource->update(['is_active' => true]);
        return $complianceSource;
    }

    public function inactivate($id)
    {
        $complianceSource = CatComplianceSource::find($id);
        $complianceSource->update(['is_active' => false]);
        return $complianceSource;
    }
}
