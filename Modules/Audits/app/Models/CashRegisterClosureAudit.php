<?php

namespace Modules\Audits\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// use Modules\Audits\Database\Factories\CashRegisterClosureAuditFactory;

class CashRegisterClosureAudit extends Model
{
    use HasFactory;

    protected $table = 'cash_register_closure_audits';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'status',
        'expected_cash',
        'counted_cash',
        'expected_bank_transfer',
        'counted_bank_transfer',
        'observations',
        'report',
        'pdf_path',
        'cash_register_closure_id',
        'audited_by',
    ];

    public function auditor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'audited_by');
    }

    public function cashRegisterClosure(): BelongsTo
    {
        return $this->belongsTo(CashRegisterClosure::class, 'cash_register_closure_id');
    }
}