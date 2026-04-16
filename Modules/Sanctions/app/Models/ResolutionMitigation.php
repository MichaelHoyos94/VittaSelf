<?php

namespace Modules\Sanctions\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResolutionMitigation extends Model
{
    use HasFactory;

    protected $table = 'resolution_mitigations';

    public $timestamps = false;

    protected $fillable = [
        'resolution_id',
        'cat_mitigation_id',
    ];

    public function mitigation(): BelongsTo
    {
        return $this->belongsTo(CatMitigation::class, 'cat_mitigation_id');
    }

    public function resolution(): BelongsTo
    {
        return $this->belongsTo(Resolution::class, 'resolution_id');
    }
}
