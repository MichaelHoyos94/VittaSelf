<?php

namespace Modules\Sanctions\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class CatMitigation extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'cat_mitigations';

    protected $fillable = [
        'code',
        'mitigation',
        'description',
        'active',
    ];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    public function resolutionMitigations(): HasMany
    {
        return $this->hasMany(ResolutionMitigation::class, 'cat_mitigation_id');
    }

    public function resolutions(): BelongsToMany
    {
        return $this->belongsToMany(
            Resolution::class,
            'resolution_mitigations',
            'cat_mitigation_id',
            'resolution_id'
        );
    }
}
