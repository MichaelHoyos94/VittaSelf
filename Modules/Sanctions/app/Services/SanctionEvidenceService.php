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
}
