<?php

namespace Modules\Sanctions\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class DisciplinaryCase extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'disciplinary_cases';

    protected $fillable = [
        'facts_description',
        'details',
        'user_id',
        'admin_id',
        'policy_id',
        'compliance_source_id',
        'case_status_id',
    ];

    protected $casts = [
        'case_status_id' => 'integer'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function policy(): BelongsTo
    {
        return $this->belongsTo(CatPolicy::class, 'policy_id');
    }

    public function complianceSource(): BelongsTo
    {
        return $this->belongsTo(CatComplianceSource::class, 'compliance_source_id');
    }

    public function caseStatus(): BelongsTo
    {
        return $this->belongsTo(CatCaseStatus::class, 'case_status_id');
    }

    public function resolution(): HasOne
    {
        return $this->hasOne(Resolution::class, 'disciplinary_case_id');
    }

    public function userEvidences(): HasMany
    {
        return $this->hasMany(UserEvidence::class, 'disciplinary_case_id');
    }

    public function sanctionEvidences(): HasMany
    {
        return $this->hasMany(SanctionEvidence::class, 'disciplinary_case_id');
    }
}
