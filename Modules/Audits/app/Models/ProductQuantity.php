<?php

namespace Modules\Audits\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductQuantity extends Model
{

    protected $table = "product_quantities";

    protected $fillable = [
        'product_count_id',
        'product_id',
        'quantity',
        'observations'
    ];

    public function productCount(): BelongsTo
    {
        return $this->belongsTo(ProductCount::class, 'product_count_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}