<?php 

namespace Modules\Sanctions\Repositories;
Use Modules\Sanctions\Models\CatCaseStatus;

class CatCaseStatusRepository
{
    public function getAll()
    {
        return CatCaseStatus::all();
    }
}