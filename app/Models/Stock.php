<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $table = 'stocks';

    protected $fillable = [
        'cost_center_id',
        'product_id',
        'quantity',
        'batch',
        'received_at',
        'expires_at',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function costCenter()
    {
        return $this->belongsTo(CostCenter::class);
    }
}