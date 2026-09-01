<?php

namespace App\Http\Requests;

use App\Enums\Category;
use App\Enums\Presentation;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreProductRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'cover' => 'nullable|file|mimes:jpg,png|max:500',
            'price' => 'required|numeric|min:0',
            'points' => 'required|integer|min:0',
            'presentation' => ['required', new Enum(Presentation::class)],
            'category' => ['required', new Enum(Category::class)],
        ];
    }
}
