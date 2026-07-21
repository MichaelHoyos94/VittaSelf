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

    public function getAll()
    {
        return InternalOrder::with(['customer', 'commercialAgent'])->paginate(10);
    }
}
