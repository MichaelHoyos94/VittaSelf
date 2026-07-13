<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}