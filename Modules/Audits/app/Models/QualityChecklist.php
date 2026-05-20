<?php

namespace Modules\Audits\Models;

use App\Models\CostCenter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class QualityChecklist extends Model
{
    use HasFactory;

    protected $table = 'quality_checklist';

    protected $fillable = [
        'temperature_start',
        'temperature_end',
        'smoke_detector',
        'extingisher_expiration_date',
        'last_plague_control',
        'last_bathroom_sanitation',
        'humidity_percentage',
        'observations',
        'checklist_date',
        'cost_center_id',
    ];

    protected function casts(): array
    {
        return [
            'temperature_start' => 'float',
            'temperature_end' => 'float',
            'smoke_detector' => 'boolean',
            'extingisher_expiration_date' => 'datetime',
            'last_plague_control' => 'datetime',
            'last_bathroom_sanitation' => 'datetime',
            'humidity_percentage' => 'float',
            'checklist_date' => 'date',
        ];
    }

    public function costCenter(): BelongsTo
    {
        return $this->belongsTo(CostCenter::class, 'cost_center_id');
    }

    public function audit(): HasOne
    {
        return $this->hasOne(QualityChecklistAudit::class, 'quality_checklist_id');
    }
}
