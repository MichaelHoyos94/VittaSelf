<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{
    protected $table = 'plans';
    protected $fillable = [
        'code',
        'name',
        'logo',
        'description',
        'min_points',
        'next_plan_id',
        'previous_plan_id',
    ];
    public function nextPlan(): BelongsTo
    {
        return $this->belongsTo(Plan::class, 'next_plan_id');
    }
    public function previousPlan(): BelongsTo
    {
        return $this->belongsTo(Plan::class, 'previous_plan_id');
    }
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
    public function benefits(): HasMany
    {
        return $this->hasMany(Benefit::class);
    }
}
