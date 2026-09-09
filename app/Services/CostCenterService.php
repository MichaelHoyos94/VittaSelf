<?php

namespace App\Services;

use App\Repositories\CostCenterRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class CostCenterService
{
    public function __construct(
        private CostCenterRepository $costCenterRepository
    ) {}

    public function getAllSearch($search)
    {
        return $this->costCenterRepository->getAllSearch($search);
    }

    public function getAll()
    {
        return $this->costCenterRepository->getAll();
    }

    public function create(array $data)
    {
        return $this->costCenterRepository->create($this->normalizeData($data));
    }

    public function getById($id)
    {
        return $this->costCenterRepository->getById($id);
    }

    public function update($id, array $data)
    {
        return $this->costCenterRepository->update($id, $this->normalizeData($data));
    }

    public function delete($id): bool
    {
        return $this->costCenterRepository->delete($id);
    }

    private function normalizeData(array $data): array
    {
        if (($data['photo'] ?? null) instanceof UploadedFile) {
            $extension = $data['photo']->getClientOriginalExtension();
            $fileName = Str::uuid().'.'.$extension;
            $data['photo'] = $data['photo']->storeAs('cost_centers', $fileName, 'public');
        } elseif (empty($data['photo'])) {
            unset($data['photo']);
        }

        return $data;
    }
}
