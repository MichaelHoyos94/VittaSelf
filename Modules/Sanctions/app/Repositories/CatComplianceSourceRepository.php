<?php
namespace Modules\Sanctions\Repositories;
Use Modules\Sanctions\Models\CatComplianceSource;

class CatComplianceSourceRepository
{
    public function getAll()
    {
        return CatComplianceSource::all();
    }
}