<?php

namespace Modules\Sanctions\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CatSanction extends Model
{
    use HasFactory;

    protected $table = 'cat_sanctions';

    public $timestamps = false;

    protected $fillable = [
        'code',
        'sanction',
        'description',
        'active',
    ];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    public function resolutionSanctions(): HasMany
    {
        return $this->hasMany(ResolutionSanction::class, 'cat_sanction_id');
    }

    public function resolutions(): BelongsToMany
    {
        return $this->belongsToMany(
            Resolution::class,
            'resolution_sanctions',
            'cat_sanction_id',
            'resolution_id'
        );
    }
}
