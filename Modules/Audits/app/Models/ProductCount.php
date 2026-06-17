<?php

namespace Modules\Audits\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCount extends Model
{

    protected $table = "product_counts";

    protected $fillable = [
        'cost_center_id',
        'counted_by',
        'count_date',
        'observations',
        'audited'
    ];
}