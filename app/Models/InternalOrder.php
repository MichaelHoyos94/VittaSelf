<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InternalOrder extends Model
{
    protected $table = "internal_orders";
    protected $fillable = [
        'subtotal',
        'total',
        'status',
        'payment_method',
        'shipping_address',
        'phone',
        'email',
        'discount',
        'points',
        'user_id',
        'commercial_agent_id',
        'cost_center_id',
    ];
    protected $casts = [
        'subtotal' => 'decimal:2',
        'total' => 'decimal:2',
        'created_at' => 'datetime', // Format to Y-m-d H:i:s
        'updated_at' => 'datetime',
    ];
    public function products(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
