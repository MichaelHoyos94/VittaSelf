<?php

namespace Modules\Sanctions\Services;

use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Modules\Sanctions\Repositories\DisciplinaryCaseRepository;
use Modules\Sanctions\Repositories\SanctionEvidenceRepository;
use Modules\Sanctions\Repositories\UserEvidenceRepository;

class SanctionEvidenceService
{
    public function __construct(
        protected SanctionEvidenceRepository $repository,
        protected UserEvidenceRepository $userEvidenceRepository,
        protected DisciplinaryCaseRepository $disciplinaryCaseRepository,
    ) {}

    public function getByCaseId($caseId)
    {
        return $this->repository->getByCaseId($caseId);
    }

    public function storeEvidences($caseId, $evidences, $description)
    {
        foreach ($evidences as $evidence) {
            $path = "sanction_evidences/{$caseId}/evidences";
            $fileName = time().'_'.$evidence->getClientOriginalName();
            $filePath = $evidence->storeAs($path, $fileName, 'public');
            $this->repository->create([
                'disciplinary_case_id' => $caseId,
                'file' => $filePath,
                'description' => $description,
            ]);
        }
    }

    public function storeRebuttals($caseId, $userId, $rebuttals, $description): void
    {
        $disciplinaryCase = $this->disciplinaryCaseRepository->getById($caseId);

        if ((int) $disciplinaryCase->user_id !== (int) $userId) {
            throw ValidationException::withMessages([
                'rebuttals' => 'You are not allowed to upload rebuttals for this case.',
            ]);
        }

        if ($disciplinaryCase->caseStatus?->code !== 'AWAITING_EVIDENCES') {
            throw ValidationException::withMessages([
                'rebuttals' => 'Rebuttals can only be uploaded while the case is awaiting evidences.',
            ]);
        }

        foreach ($rebuttals as $rebuttal) {
            $path = "user_evidences/{$caseId}/rebuttals";
            $extension = $rebuttal->getClientOriginalExtension();
            $fileName = Str::uuid().($extension ? ".{$extension}" : '');
            $filePath = $rebuttal->storeAs($path, $fileName, 'public');

            $this->userEvidenceRepository->createRebuttal([
                'disciplinary_case_id' => $caseId,
                'file' => $filePath,
                'description' => $description,
            ]);
        }
    }
}
