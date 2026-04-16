<?php

namespace Modules\Sanctions\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class CatComplianceSource extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'cat_compliance_sources';

    protected $fillable = [
        'code',
        'source',
        'description',
        'active',
    ];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    public function disciplinaryCases(): HasMany
    {
        return $this->hasMany(DisciplinaryCase::class, 'compliance_source_id');
    }
}
