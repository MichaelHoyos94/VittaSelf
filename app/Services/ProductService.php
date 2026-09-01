<?php

namespace App\Services;

use App\Repositories\ProductRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class ProductService
{
    public function __construct(private ProductRepository $repository) {}

    public function getAll($search = null)
    {
        return $this->repository->getAll($search);
    }

    public function create(array $data)
    {
        $data = $this->prepareData($data);

        return $this->repository->create($data);
    }

    public function getById($id)
    {
        return $this->repository->getById($id);
    }

    public function update($id, array $data)
    {
        $data = $this->prepareData($data);

        return $this->repository->update($id, $data);
    }

    public function delete($id): bool
    {
        return $this->repository->delete($id);
    }

    private function prepareData(array $data): array
    {
        $data['slug'] = Str::slug($data['name']);

        if (($data['cover'] ?? null) instanceof UploadedFile) {
            $extension = $data['cover']->getClientOriginalExtension();
            $fileName = Str::uuid().'.'.$extension;
            $data['cover'] = $data['cover']->storeAs('products', $fileName, 'public');
        } elseif (empty($data['cover'])) {
            unset($data['cover']);
        }

        return $data;
    }
}
