<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
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
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function qualityChecklists(): HasMany
    {
        return $this->hasMany(QualityChecklist::class, 'cost_center_id');
    }
}
