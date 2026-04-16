<?php

namespace Modules\Sanctions\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class SanctionEvidence extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'sanction_evidences';

    protected $fillable = [
        'file',
        'description',
        'disciplinary_case_id',
    ];

    public function disciplinaryCase(): BelongsTo
    {
        return $this->belongsTo(DisciplinaryCase::class, 'disciplinary_case_id');
    }
}
