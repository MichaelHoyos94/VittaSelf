<?php
namespace Modules\Sanctions\Repositories;
use Modules\Sanctions\Models\CatCaseStatus;

class CatCaseStatusRepository
{
    public function getAll()
    {
        return CatCaseStatus::all();
    }
    public function getById($id)
    {
        return CatCaseStatus::findOrFail($id);
    }
}
