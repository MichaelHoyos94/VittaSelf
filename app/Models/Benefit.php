<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Benefit extends Model
{
    protected $table = 'benefits';
    protected $fillable = [
        'plan_id',
        'code',
        'name',
        'type',
        'value',
        'description',
        'icon',
    ];
    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }
}
