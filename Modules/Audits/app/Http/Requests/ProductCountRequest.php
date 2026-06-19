<?php

namespace Modules\Audits\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductCountRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'cost_center_id' => 'required|exists:cost_centers,id',
            'counted_by' => 'required|exists:users,id',
            'count_date' => 'required|date',
            'observations' => 'nullable|string|max:255',
            'products' => 'array',
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
