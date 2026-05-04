<?php

namespace Modules\Sanctions\Services;
use Modules\Sanctions\Repositories\SanctionEvidenceRepository;

class SanctionEvidenceService
{
    public function __construct(protected SanctionEvidenceRepository $repository){}
    public function getByCaseId($caseId)
    {
        return $this->repository->getByCaseId($caseId);
    }
    public function storeEvidences($caseId, $evidences)
    {
        // ERROR AQUI
        foreach ($evidences as $evidence) {
            $path = "sanction_evidences/{$caseId}";
            $fileName = time() . '_' . $evidence->getClientOriginalName();
            $filePath = $evidence->storeAs($path, $fileName, 'public');
        }
    }
}
