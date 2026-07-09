<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InternalOrderRequest extends FormRequest
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
            'payment_method' => 'required|string',
            'shipping_address' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'user_id' => 'required|exists:users,id',
            'products' => 'array',
            'products.*.id' => 'exists:products,id',
            'products.*.quantity' => 'required|numeric',
            'products.*.price' => 'required|numeric',
            'products.*.points' => 'required|numeric',
        ];
    }
}
