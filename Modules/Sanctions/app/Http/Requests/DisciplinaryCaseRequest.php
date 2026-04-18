<?php

namespace Modules\Sanctions\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DisciplinaryCaseRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'facts_description' => 'required|min:20',
            'details' => 'required',
            'user_id' => 'required|exists:users,id',
            'admin_id' => 'required|exists:users,id',
            'policy_id' => 'required|exists:cat_policies,id',
            'compliance_source_id' => 'required|exists:cat_compliance_sources,id',
        ];
    }

    public function messages()
    {
        return [
            'facts_description.required' => 'Facts description are required.',
            'facts_description.min' => 'Facts description is too short.',

            'details.required' => 'Details are required.',
            'user_id.required' => 'You must search an user.',
            'admin_id.required' => 'Admin is required.',

            'policy_id.required' => 'You must select a policy.',
            'compliance_source_id.required' => 'You must select a source.',
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
