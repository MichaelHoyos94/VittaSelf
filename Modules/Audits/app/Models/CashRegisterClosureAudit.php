<?php

namespace Modules\Audits\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Audits\Database\Factories\CashRegisterClosureAuditFactory;

class CashRegisterClosureAudit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    // protected static function newFactory(): CashRegisterClosureAuditFactory
    // {
    //     // return CashRegisterClosureAuditFactory::new();
    // }
}
