<?php

namespace Modules\Audits\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductCountAuditRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'product_count_id' => 'required|exists:product_counts,id',
            'status' => 'required',
            'audited_by' => 'required|exists:users,id',
            'audited_at' => 'required|date',
            'total_expected_products' => 'required',
            'total_counted_products' => 'required',
            'total_difference' => 'required',
            'products_with_mismatch' => 'required',
            'products_with_observations' => 'required',
            'requires_recount' => 'required',
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
