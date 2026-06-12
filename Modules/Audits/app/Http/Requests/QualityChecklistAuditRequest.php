<?php

namespace Modules\Audits\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QualityChecklistAuditRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'quality_checklist_id' => 'required|exists:quality_checklist,id',
            'status' => 'required|in:excellent,good,bad,critical',
            'requires_actions' => 'required|boolean',
            'corrective_actions' => 'nullable|string|max:255',
            'audited_by' => 'required|exists:users,id',
            'report' => 'nullable|string|max:65535',
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
}
