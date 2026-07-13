<?php

namespace Modules\Audits\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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
}