<?php

use App\Enums\Category;
use App\Enums\Presentation;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

it('renders the product manager', function () {
    $user = User::factory()->create();
    Product::factory()->create(['name' => 'DiviLife Plus']);

    $this->actingAs($user)
        ->get(route('products.manage-products'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Products/ManageProducts')
            ->has('products.data', 1)
            ->where('products.data.0.name', 'DiviLife Plus')
        );
});

it('creates a product with a cover file', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $cover = UploadedFile::fake()->image('product.png')->size(100);

    $this->actingAs($user)
        ->post(route('products.store'), [
            'name' => 'Green Shake',
            'description' => 'Powder supplement.',
            'cover' => $cover,
            'price' => 49999,
            'points' => 2,
            'presentation' => Presentation::POWDER->value,
            'category' => Category::SUPPLEMENTS->value,
        ])
        ->assertRedirect(route('products.manage-products'))
        ->assertSessionHas('success');

    $product = Product::where('name', 'Green Shake')->firstOrFail();

    $this->assertDatabaseHas('products', [
        'name' => 'Green Shake',
        'slug' => 'green-shake',
    ]);
    Storage::disk('public')->assertExists($product->cover);
});

it('updates a product', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $product = Product::factory()->create(['name' => 'Old Product']);
    $cover = UploadedFile::fake()->image('updated.jpg')->size(100);

    $this->actingAs($user)
        ->put(route('products.update', $product), [
            'name' => 'Updated Product',
            'description' => 'Updated description.',
            'cover' => $cover,
            'price' => 99999,
            'points' => 3,
            'presentation' => Presentation::LIQUID->value,
            'category' => Category::HEALTH_CARE->value,
        ])
        ->assertRedirect(route('products.manage-products'))
        ->assertSessionHas('success');

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'name' => 'Updated Product',
        'slug' => 'updated-product',
    ]);
    Storage::disk('public')->assertExists($product->fresh()->cover);
});

it('deletes a product', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();

    $this->actingAs($user)
        ->delete(route('products.destroy', $product))
        ->assertRedirect(route('products.manage-products'))
        ->assertSessionHas('success');

    $this->assertSoftDeleted('products', [
        'id' => $product->id,
    ]);
});
