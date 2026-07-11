<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    protected $table = 'orders';
    protected $fillable = [
        'subtotal',
        'total',
        'payment_method',
        'shipping_address',
        'email',
        'phone',
        'user_id',
        'shipping_price',
        'shipping_discount',
        'discount',
        'points',
    ];
    protected $casts = [
        'subtotal' => 'decimal:2', 
        'total' => 'decimal:2',
        'created_at' => 'datetime', // Format to Y-m-d H:i:s
        'updated_at' => 'datetime',
    ];
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity', 'unit_price', 'discount', 'subtotal', 'total');
    }
}