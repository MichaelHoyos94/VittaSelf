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
        'suspend_account',
        'suspend_benefits',
        'freeze_earnings',
        'block_qualification',
        'suspend_code',
        'applied_at',
        'lifted_at',
        'resolution_id',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'suspend_account' => 'boolean',
            'suspend_benefits' => 'boolean',
            'freeze_earnings' => 'boolean',
            'block_qualification' => 'boolean',
            'suspend_code' => 'boolean',
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
