<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartProduct extends Model
{
    protected $table = 'cart_products';
    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
        'unit_price',
        'discount_unit_price',
        'total_price',
        'discount_total_price'
    ];

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class, 'cart_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}