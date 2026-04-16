<?php
namespace Modules\Sanctions\Repositories;
Use Modules\Sanctions\Models\UserEvidence;
class UserEvidenceRepository
{
    public function create(array $data)
    {
        return UserEvidence::create($data);
    }
    public function getByCaseId($caseId)
    {
        return UserEvidence::where('case_id', $caseId)->get();
    }
    public function update($id, array $data)
    {
        $evidence = UserEvidence::findOrFail($id);
        $evidence->update($data);
        return $evidence;
    }
    public function delete($id)
    {
        $evidence = UserEvidence::findOrFail($id);
        $evidence->delete();
        return true;
    }
}