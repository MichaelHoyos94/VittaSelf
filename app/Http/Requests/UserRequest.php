<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

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
            'document_number' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string',
            'address' => 'nullable|string',
            'password' => 'required|string|confirmed',
            'representative_eui_code' => 'nullable|string',
        ];
    }
}
