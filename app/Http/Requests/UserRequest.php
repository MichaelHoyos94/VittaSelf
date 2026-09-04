<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class UserRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'last_name' => 'required|string',
            'document_number' => 'required|string|unique:users,document_number|numeric|digits_between:7,10',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|numeric|digits:10',
            'address' => 'nullable|string',
            'password' => 'required|string|confirmed',
            'representative_eui_code' => 'nullable|string',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'name.required' => 'The name field is required.',
            'last_name.required' => 'The last name field is required.',
            'document_number.required' => 'The document number field is required.',
            'email.required' => 'The email field is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email has already been taken.',
            'phone.required' => 'The phone field is required.',
            'phone.numeric' => 'The phone must be a valid number.',
            'address.string' => 'The address must be a string.',
            'password.required' => 'The password field is required.',
            'password.confirmed' => 'The password confirmation does not match.',
            'representative_eui_code.string' => 'The representative EUI code must be a string.',
        ];
    }
}
