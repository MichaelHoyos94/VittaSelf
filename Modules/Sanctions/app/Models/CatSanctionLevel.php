<?php

namespace Modules\Sanctions\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CatSanctionLevel extends Model
{
    use HasFactory;

    protected $table = 'cat_sanctions_level';

    public $timestamps = false;

    protected $fillable = [
        'code',
        'sanction_level',
        'sanction_level_description',
    ];

    public function resolutions(): HasMany
    {
        return $this->hasMany(Resolution::class, 'sanction_level_id');
    }
}
