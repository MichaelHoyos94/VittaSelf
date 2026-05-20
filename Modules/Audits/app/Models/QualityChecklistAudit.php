<?php

namespace Modules\Audits\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QualityChecklistAudit extends Model
{
    use HasFactory;

    protected $table = 'quality_checklist_audit';

    protected $fillable = [
        'status',
        'requires_actions',
        'corrective_actions',
        'quality_checklist_id',
        'audited_by',
    ];

    protected function casts(): array
    {
        return [
            'requires_actions' => 'boolean',
        ];
    }

    public function qualityChecklist(): BelongsTo
    {
        return $this->belongsTo(QualityChecklist::class, 'quality_checklist_id');
    }

    public function auditor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'audited_by');
    }
}
