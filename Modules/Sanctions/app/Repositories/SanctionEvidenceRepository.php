<?php
namespace Modules\Sanctions\Repositories;
use Modules\Sanctions\Models\SanctionEvidence;

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
    public function storeEvidence($caseId, $file)
    {
        $path = $file->store('sanction_evidences', 'public');

        return $this->create([
            'case_id' => $caseId,
            'file_path' => $path,
            'original_name' => $file->getClientOriginalName(),
        ]);
    }
}
