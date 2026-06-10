<?php

namespace Modules\Audits\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QualityChecklistRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'cost_center_id' => 'required|exists:cost_centers,id',
            'checklist_date' => 'required|date',
            'temperature_start' => 'required|numeric',
            'temperature_end' => 'required|numeric',
            'smoke_detector' => 'required',
            'extingisher_expiration_date' => 'required|date',
            'last_plague_control' => 'required|date',
            'last_bathroom_sanitation' => 'required|date',
            'humidity_percentage' => "required|numeric|between:0,100",
            'observations' => "nullable|string|max:255",
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
