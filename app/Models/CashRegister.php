<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CashRegister extends Model
{
    protected $table = 'cash_registers';
    protected $fillable = [
        'name',
        'code',
        'cost_center_id',
        'commercial_agent_id',
        'base',
    ];
    public function costCenter(): BelongsTo
    {
        return $this->belongsTo(CostCenter::class);
    }
    public function commercialAgent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'commercial_agent_id');
    }
}