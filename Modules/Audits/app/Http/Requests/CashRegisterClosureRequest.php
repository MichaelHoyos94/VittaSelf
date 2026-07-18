<?php

namespace Modules\Audits\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Override;

class CashRegisterClosureRequest extends FormRequest
{
    protected function prepareForValidation()
    {
        $this->merge([
            'commercial_agent_id' => auth()->user()->id,
            'date' => now()->format('Y-m-d'),
        ]);

        // Set 0 if the bills and coins are not provided
        $fields = [
            'bills_100000',
            'bills_50000',
            'bills_20000',
            'bills_10000',
            'bills_5000',
            'bills_2000',
            'coins_1000',
            'coins_500',
            'coins_200',
            'coins_100',
            'coins_50',
            'bank_transfer',
        ];
        foreach ($fields as $field) {
            if (blank($this->input($field))) {
                $this->merge([$field => 0]);
            }
        }
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'bills_100000' => 'nullable|integer',
            'bills_50000' => 'nullable|integer',
            'bills_20000' => 'nullable|integer',
            'bills_10000' => 'nullable|integer',
            'bills_5000' => 'nullable|integer',
            'bills_2000' => 'nullable|integer',
            'coins_1000' => 'nullable|integer',
            'coins_500' => 'nullable|integer',
            'coins_200' => 'nullable|integer',
            'coins_100' => 'nullable|integer',
            'coins_50' => 'nullable|integer',
            'bank_transfer' => 'nullable|numeric',
            'date' => 'required|date',
            'observations' => 'nullable|string|max:128',
            'cash_register_id' => 'required|exists:cash_registers,id',
            'commercial_agent_id' => 'required|exists:users,id',
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