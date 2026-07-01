<?php

use App\Enums\Category;
use App\Enums\Presentation;
use App\Models\CostCenter;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\QueryException;
use Modules\Audits\Models\ProductCount;
use Modules\Audits\Services\ProductCountService;

it('creates a product count together with all its product quantities', function () {
    $costCenter = CostCenter::factory()->create();
    $user = User::factory()->create(['cost_center_id' => $costCenter->id]);
    $products = collect([
        createProductForCount('Vitamin C'),
        createProductForCount('Omega 3'),
    ]);

    $payload = [
        'cost_center_id' => $costCenter->id,
        'counted_by' => $user->id,
        'count_date' => '2026-06-28',
        'observations' => 'Monthly inventory count',
        'products' => [
            [
                'product_id' => $products[0]->id,
                'quantity' => 12,
                'observations' => 'Complete boxes',
            ],
            [
                'product_id' => $products[1]->id,
                'quantity' => 7,
                'observations' => null,
            ],
        ],
    ];

    $response = $this->actingAs($user)
        ->post(route('audits.product-counts.store'), $payload);

    $productCount = ProductCount::query()->sole();

    $response
        ->assertRedirect(route('audits.product-counts.index'))
        ->assertSessionHas(
            'success',
            "Product count created successfully with ID: {$productCount->id}"
        );

    $this->assertDatabaseHas('product_counts', [
        'id' => $productCount->id,
        'cost_center_id' => $costCenter->id,
        'counted_by' => $user->id,
        'count_date' => '2026-06-28',
        'observations' => 'Monthly inventory count',
        'audited' => false,
    ]);

    $this->assertDatabaseCount('product_quantities', 2);
    $this->assertDatabaseHas('product_quantities', [
        'product_count_id' => $productCount->id,
        'product_id' => $products[0]->id,
        'quantity' => 12,
        'observations' => 'Complete boxes',
    ]);
    $this->assertDatabaseHas('product_quantities', [
        'product_count_id' => $productCount->id,
        'product_id' => $products[1]->id,
        'quantity' => 7,
        'observations' => null,
    ]);
});

it('rolls back the product count when one product quantity cannot be created', function () {
    $costCenter = CostCenter::factory()->create();
    $user = User::factory()->create(['cost_center_id' => $costCenter->id]);
    $product = createProductForCount('Valid product');

    $payload = [
        'cost_center_id' => $costCenter->id,
        'counted_by' => $user->id,
        'count_date' => '2026-06-28',
        'observations' => null,
        'products' => [
            ['product_id' => $product->id, 'quantity' => 4, 'observations' => null],
            ['product_id' => PHP_INT_MAX, 'quantity' => 1, 'observations' => null],
        ],
    ];

    try {
        app(ProductCountService::class)->create($payload);
        $this->fail('A foreign key violation was expected.');
    } catch (QueryException) {
        $this->assertDatabaseCount('product_counts', 0);
        $this->assertDatabaseCount('product_quantities', 0);
    }
});

function createProductForCount(string $name): Product
{
    return Product::query()->create([
        'name' => $name,
        'description' => "Product used by the {$name} integration test",
        'cover' => 'product.jpg',
        'price' => 10,
        'points' => 1,
        'slug' => fake()->unique()->slug(),
        'presentation' => Presentation::CAPSULES,
        'category' => Category::SUPPLEMENTS,
    ]);
}
