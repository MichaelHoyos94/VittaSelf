<?php

namespace Modules\Sanctions\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResolutionSanction extends Model
{
    use HasFactory;

    protected $table = 'resolution_sanctions';

    public $timestamps = false;

    protected $fillable = [
        'cat_sanction_id',
        'resolution_id',
    ];

    public function sanction(): BelongsTo
    {
        return $this->belongsTo(CatSanction::class, 'cat_sanction_id');
    }

    public function resolution(): BelongsTo
    {
        return $this->belongsTo(Resolution::class, 'resolution_id');
    }
}
