<?php

namespace Modules\Sanctions\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MitigationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'code' => 'required|string|max:255',
            'mitigation' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
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
