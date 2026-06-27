<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderProduct extends Model
{
    protected $table = 'order_products';
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'unit_price',
        'unit_discount_price',
        'total_price',
        'discount_total_price',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}