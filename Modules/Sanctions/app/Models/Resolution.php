<?php

namespace Modules\Sanctions\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Sanctions\Enums\ResolutionType;

class Resolution extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'resolution';

    protected $fillable = [
        'resolution_type',
        'resolution_text',
        'disciplinary_case_id',
        'sanction_level_id',
    ];

    protected function casts(): array
    {
        return [
            'resolution_type' => ResolutionType::class,
        ];
    }

    public function disciplinaryCase(): BelongsTo
    {
        return $this->belongsTo(DisciplinaryCase::class, 'disciplinary_case_id');
    }

    public function sanctionLevel(): BelongsTo
    {
        return $this->belongsTo(CatSanctionLevel::class, 'sanction_level_id');
    }

    public function sanctionEnforcements(): HasMany
    {
        return $this->hasMany(SanctionEnforcement::class, 'resolution_id');
    }

    public function sanctions(): BelongsToMany
    {
        return $this->belongsToMany(
            CatSanction::class,
            'resolution_sanctions',
            'resolution_id',
            'cat_sanction_id'
        );
    }

    public function mitigations(): BelongsToMany
    {
        return $this->belongsToMany(
            CatMitigation::class,
            'resolution_mitigations',
            'resolution_id',
            'cat_mitigation_id'
        );
    }
}
