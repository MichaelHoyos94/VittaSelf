<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Audits\Models\ProductCount;
use Modules\Audits\Models\QualityChecklist;

class CostCenter extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'cost_centers';

    protected $fillable = [
        'name',
        'address',
        'contact_email',
        'phone',
        'photo',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'cost_center_id');
    }

    public function qualityChecklists(): HasMany
    {
        return $this->hasMany(QualityChecklist::class, 'cost_center_id');
    }

    public function productCounts(): HasMany
    {
        return $this->hasMany(ProductCount::class, 'cost_center_id');
    }
}
