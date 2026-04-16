<?php

namespace Modules\Sanctions\Services;
use Modules\Sanctions\Repositories\UserEvidenceRepository;

class UserEvidenceService
{
    public function __construct(protected UserEvidenceRepository $repository){}
    public function getByCaseId($caseId)
    {
        return $this->repository->getByCaseId($caseId);
    }
}