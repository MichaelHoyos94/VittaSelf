<?php

namespace Modules\Sanctions\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class SanctionEnforcement extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'sanction_enforcements';

    protected $fillable = [
        'SUSPEND_ACCOUNT',
        'FREEZE_PLAN',
        'FREEZE_BONUSES',
        'FREEZE_POINTS',
        'SUSPEND_CODE',
        'DOWNGRADE_PLAN',
        'TERMINATE_ACCOUNT',
        'applied_at',
        'lifted_at',
        'resolution_id',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'SUSPEND_ACCOUNT' => 'boolean',
            'FREEZE_PLAN' => 'boolean',
            'FREEZE_BONUSES' => 'boolean',
            'FREEZE_POINTS' => 'boolean',
            'SUSPEND_CODE' => 'boolean',
            'DOWNGRADE_PLAN' => 'boolean',
            'TERMINATE_ACCOUNT' => 'boolean',
            'applied_at' => 'datetime',
            'lifted_at' => 'datetime',
        ];
    }

    public function resolution(): BelongsTo
    {
        return $this->belongsTo(Resolution::class, 'resolution_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
