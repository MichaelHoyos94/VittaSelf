<?php

namespace Modules\Sanctions\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResolutionRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        if (!$this->filled('disciplinary_case_id') && $this->query('disciplinaryCaseId')) {
            $this->merge([
                'disciplinary_case_id' => $this->query('disciplinaryCaseId'),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'resolution_text' => 'required|min:10',
            'resolution_type' => 'required|in:PROCEDE,NOT_PROCEDE',
            'disciplinary_case_id' => 'required|exists:disciplinary_cases,id|unique:resolution,disciplinary_case_id',
            'sanction_level_id' => 'required|exists:cat_sanctions_level,id',
            'sanctions' => 'array',
            'sanctions.*' => 'exists:cat_sanctions,id',
            'mitigations' => 'array',
            'mitigations.*' => 'exists:cat_mitigations,id',
        ];
    }

    public function messages()
    {
        return [
            'resolution_text.required' => 'Resolution details are required.',
            'resolution_text.min' => 'Resolution details must be at least 10 characters.',
            'resolution_type.required' => 'Resolution type is required.',
            'resolution_type.in' => 'Resolution type must be either "PROCEDE" or "NOT_PROCEDE".',
            'disciplinary_case_id.required' => 'Disciplinary case is required.',
            'disciplinary_case_id.exists' => 'Selected disciplinary case does not exist.',
            'disciplinary_case_id.unique' => 'This disciplinary case already has a resolution.',
            'sanction_level_id.required' => 'Sanction severity level is required.',
            'sanction_level_id.exists' => 'Selected sanction severity level does not exist.',
            'sanctions.array' => 'Sanctions must be an array.',
            'sanctions.*.exists' => 'One or more selected sanctions do not exist.',
            'mitigations.array' => 'Mitigations must be an array.',
            'mitigations.*.exists' => 'One or more selected mitigations do not exist.',
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
