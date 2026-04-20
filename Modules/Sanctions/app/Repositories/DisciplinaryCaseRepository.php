<?php
namespace Modules\Sanctions\Repositories;
use Modules\Sanctions\Models\DisciplinaryCase;
class DisciplinaryCaseRepository
{
    public function getAll($sort = null, $filter = null, $pagination = null)
    {
        // handle sort, filter, pagination
        $query = DisciplinaryCase::query();
        $query->with(['user', 'policy', 'admin', 'caseStatus']);
        if ($sort) {
            $query->orderBy($sort['field'], $sort['direction']);
        }
        if ($filter) {
            foreach ($filter as $field => $value) {
                $query->where($field, 'like', "%$value%");
            }
        }
        if ($pagination) {
            return $query->paginate($pagination['per_page']);
        }
        return $query->get();
    }
    public function create(array $data)
    {
        return DisciplinaryCase::create($data);
    }
    public function update($id, array $data)
    {
        $disciplinaryCase = DisciplinaryCase::findOrFail($id);
        $disciplinaryCase->update($data);
        return $disciplinaryCase;
    }
    public function delete($id)
    {
        $disciplinaryCase = DisciplinaryCase::findOrFail($id);
        $disciplinaryCase->delete();
        return true;
    }
}
