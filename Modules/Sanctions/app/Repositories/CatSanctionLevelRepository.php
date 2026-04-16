<?php
namespace Modules\Sanctions\Repositories;
use Modules\Sanctions\Models\CatSanctionLevel;
class CatSanctionLevelRepository
{
    public function getAll()
    {
        return CatSanctionLevel::where('active', true)->get();
    }
}
