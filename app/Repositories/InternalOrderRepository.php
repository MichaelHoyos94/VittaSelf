<?php

namespace App\Repositories;

use App\Models\InternalOrder;
use Illuminate\Support\Facades\DB;

class InternalOrderRepository
{
    public function create($data)
    {
        return DB::transaction(function () use ($data) {
            $products = $data['products'];
            unset($data['products']);
            $internalOrder = InternalOrder::create($data);
            foreach ($products as $product) {
                $internalOrder->products()->attach($product['id'], [
                    'quantity' => $product['quantity'],
                ]);
            }
            return $internalOrder;
        });
    }

    public function getAll($search, $perPage = 10, $sortField = 'created_at', $sortDirection = 'asc')
    {
        return InternalOrder::with(['customer', 'commercialAgent'])
            ->when($search, function ($query, $search) {
                $query->whereHas('customer', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                })->orWhereHas('commercialAgent', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage)
            ->withQueryString();
    }
}
