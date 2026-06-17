<?php

namespace Modules\Audits\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCountAudit extends Model
{

    protected $table = "product_count_audits";

    protected $fillable = [
        'product_count_id',
        'status',
        'audited_by',
        'audited_at',
        'total_expected_products',
        'total_counted_productos',
        'total_difference',
        'products_with_mismatch',
        'products_with_observations',
        'requires_recount',
    ];
}