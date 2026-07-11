<?php

namespace Modules\Audits\Models;

use App\Models\CostCenter;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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

    public function productQuantities(): HasMany
    {
        return $this->hasMany(ProductQuantity::class, 'product_count_id');
    }

    public function costCenter(): BelongsTo
    {
        return $this->belongsTo(CostCenter::class, 'cost_center_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'counted_by');
    }
}
