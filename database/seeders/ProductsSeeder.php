<?php

namespace Database\Seeders;

use App\Enums\Category;
use App\Enums\Presentation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'DiviLife Plus',
                'description' => 'Suplementos con sabor a naranja',
                'cover' => 'product.jpg',
                'price' => 19.99,
                'points' => 1,
                'slug' => "divilife-plus",
                'presentation' => Presentation::TABLETS->value,
                'category' => Category::SUPPLEMENTS->value,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'AGF Vainilla',
                'description' => 'Malteada de vainilla con vitaminas.',
                'cover' => 'product.jpg',
                'price' => 19.99,
                'points' => 1,
                'slug' => "agf-vainilla",
                'presentation' => Presentation::POWDER->value,
                'category' => Category::FOOD_BEVERAGE->value,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'LBL',
                'description' => 'Bebida energizante',
                'cover' => 'product.jpg',
                'price' => 19.99,
                'points' => 1,
                'slug' => "lbl",
                'presentation' => Presentation::LIQUID->value,
                'category' => Category::FOOD_BEVERAGE->value,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('products')->insert($products);
    }
}
