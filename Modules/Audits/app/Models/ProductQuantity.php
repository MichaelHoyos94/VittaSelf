<?php

namespace Modules\Audits\Models;

use Illuminate\Database\Eloquent\Model;

class ProductQuantity extends Model
{

    protected $table = "product_quantities";

    protected $fillable = [
        'product_count_id',
        'product_id',
        'quantity',
        'observations'
    ];
}