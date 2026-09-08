<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeePutRequest extends FormRequest
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
        $employe_id = $this->route('id');
        return [
            'name' => 'required|string|alpha',
            'last_name' => 'required|string|alpha',
            'document_number' => [
                'required',
                'string',
                'numeric',
                'digits_between:7,10',
                Rule::unique('users', 'document_number')->ignore($employe_id),
            ],
            'phone' => [
                'required',
                'string',
                'numeric',
                'digits:10',
                'starts_with:3',
                Rule::unique('users', 'phone')->ignore($employe_id),
            ],
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($employe_id),
            ],
            'address' => 'nullable|string|alpha_num',
            'password' => 'nullable|confirmed',
            'cost_center_id' => 'required|integer|exists:cost_centers,id',
            'role' => 'required|string|alpha_dash',
        ];
    }
}
