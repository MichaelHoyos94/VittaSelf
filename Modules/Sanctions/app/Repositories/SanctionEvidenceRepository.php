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
}
