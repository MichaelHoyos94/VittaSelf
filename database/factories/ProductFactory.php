<?php

namespace Database\Factories;

use App\Enums\Category;
use App\Enums\Presentation;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);

        return [
            'name' => Str::title($name),
            'description' => fake()->paragraph(),
            'cover' => 'product.jpg',
            'price' => fake()->numberBetween(10000, 200000),
            'points' => fake()->numberBetween(0, 20),
            'slug' => Str::slug($name),
            'presentation' => fake()->randomElement(Presentation::cases())->value,
            'category' => fake()->randomElement(Category::cases())->value,
        ];
    }
}
