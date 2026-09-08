<?php

namespace Modules\Audits\Models;

use App\Models\CashRegister;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
        'cash',
    ];

    public function cashRegister(): BelongsTo
    {
        return $this->belongsTo(CashRegister::class, 'cash_register_id');
    }

    public function commercialAgent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'commercial_agent_id');
    }

    public function audit(): HasOne
    {
        return $this->hasOne(CashRegisterClosureAudit::class, 'cash_register_closure_id');
    }
}