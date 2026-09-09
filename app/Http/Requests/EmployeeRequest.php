<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|alpha',
            'last_name' => 'required|string|alpha',
            'document_number' => 'required|string|numeric|digits_between:7,10',
            'phone' => 'required|string|numeric|digits:10|unique:users,phone|starts_with:3',
            'email' => 'required|email|unique:users,email',
            'address' => 'nullable|string|alpha_num',
            'password' => 'required|confirmed',
            'cost_center_id' => 'required|numeric|integer',
            'role' => 'required|string|alpha_dash',
        ];
    }
}
