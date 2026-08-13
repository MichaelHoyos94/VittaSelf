<?php

namespace Modules\Sanctions\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PolicyRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'code' => 'required|string|max:255|unique:cat_policies,code',
            'policy' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'section' => 'nullable|string|max:255',
            'numeral' => 'nullable|string|max:255',
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
