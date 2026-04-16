<?php
namespace Modules\Sanctions\Repositories;
Use Modules\Sanctions\Models\SanctionEvidence;

class SanctionEvidenceRepository
{
    public function create(array $data)
    {
        return SanctionEvidence::create($data);
    }
    public function getByCaseId($caseId)
    {
        return SanctionEvidence::where('case_id', $caseId)->get();
    }
    public function update($id, array $data)
    {
        $evidence = SanctionEvidence::findOrFail($id);
        $evidence->update($data);
        return $evidence;
    }
    public function delete($id)
    {
        $evidence = SanctionEvidence::findOrFail($id);
        $evidence->delete();
        return true;
    }
}