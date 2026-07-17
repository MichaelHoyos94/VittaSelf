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
        'bills_100000',
        'bills_50000',
        'bills_20000',
        'bills_10000',
        'bills_5000',
        'bills_2000',
        'coins_1000',
        'coins_500',
        'coins_200',
        'coins_100',
        'coins_50',
        'cash_register_id',
        'commercial_agent_id',
        'bank_transfer',
        'observations',
    ];
}