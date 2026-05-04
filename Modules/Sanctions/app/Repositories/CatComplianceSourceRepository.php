<?php
namespace Modules\Sanctions\Repositories;
use Modules\Sanctions\Models\CatComplianceSource;

class CatComplianceSourceRepository
{
    public function getAll()
    {
        return CatComplianceSource::all();
    }
}
