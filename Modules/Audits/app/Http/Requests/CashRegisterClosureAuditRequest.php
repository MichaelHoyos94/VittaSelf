<?php

namespace Modules\Audits\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Override;

class CashRegisterClosureAuditRequest extends FormRequest
{
    protected function prepareForValidation()
    {
        $this->merge([
            'audited_by' => auth()->user()->id,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'status' => 'required|in:approved,rejected',
            'observations' => 'nullable|string|max:128',
            'report' => 'nullable|string|max:65535',
            'audited_by' => 'required|exists:users,id',
            'expected_cash' => 'required|numeric',
            'counted_cash' => 'required|numeric',
            'expected_bank_transfer' => 'required|numeric',
            'counted_bank_transfer' => 'required|numeric',
            'cash_register_closure_id' => 'required|exists:cash_register_closures,id',
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
