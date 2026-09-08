<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity', 'unit_price', 'discount', 'subtotal', 'total');
    }
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}