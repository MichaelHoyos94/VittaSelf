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
    ];
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity', 'unit_price', 'discount', 'subtotal', 'total');
    }
}