<?php

namespace Modules\Audits\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Audits\Database\Factories\CashRegisterClosureFactory;

class CashRegisterClosure extends Model
{
    use HasFactory;

    protected $table = 'cash_register_closures';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'date',
        'cash_register_id',
        'commercial_agent_id',
        'bank_transfer',
        'cash',
    ];
}