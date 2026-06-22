<?php

namespace Modules\Audits\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductCountAudit extends Model
{

    protected $table = "product_count_audits";

    protected $fillable = [
        'product_count_id',
        'status',
        'audited_by',
        'audited_at',
        'report',
        'pdf_path',
        'total_expected_products',
        'total_counted_products',
        'total_difference',
        'products_with_mismatch',
        'products_with_observations',
        'requires_recount',
    ];

    public function auditor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'audited_by');
    }
}
