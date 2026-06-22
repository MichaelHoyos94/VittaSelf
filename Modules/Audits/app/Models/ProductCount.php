<?php

namespace Modules\Audits\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    public function audit(): HasOne
    {
        return $this->hasOne(ProductCountAudit::class, 'product_count_id');
    }
}
