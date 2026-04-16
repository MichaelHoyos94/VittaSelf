<?php

namespace Modules\Sanctions\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CatCaseStatus extends Model
{
    use HasFactory;

    protected $table = 'cat_case_statuses';

    public $timestamps = false;

    protected $fillable = [
        'code',
        'case_status',
        'case_status_description',
    ];

    public function disciplinaryCases(): HasMany
    {
        return $this->hasMany(DisciplinaryCase::class, 'case_status_id');
    }
}
