<?php

use App\Models\CostCenter;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

it('renders the cost center manager', function () {
    $user = User::factory()->create();
    CostCenter::factory()->create(['name' => 'Main Warehouse']);

    $this->actingAs($user)
        ->get(route('cost-centers.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('CostCenters/Index')
            ->has('costCenters.data', 1)
            ->where('costCenters.data.0.name', 'Main Warehouse')
        );
});

it('creates a cost center', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $photo = UploadedFile::fake()->image('north.png')->size(100);

    $this->actingAs($user)
        ->post(route('cost-centers.store'), [
            'name' => 'North Office',
            'address' => 'Street 123',
            'contact_email' => 'north@example.com',
            'phone' => '3001234567',
            'photo' => $photo,
        ])
        ->assertRedirect(route('cost-centers.index'))
        ->assertSessionHas('success');

    $costCenter = CostCenter::where('name', 'North Office')->firstOrFail();

    $this->assertDatabaseHas('cost_centers', [
        'name' => 'North Office',
        'address' => 'Street 123',
    ]);
    Storage::disk('public')->assertExists($costCenter->photo);
});

it('updates a cost center', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $costCenter = CostCenter::factory()->create(['name' => 'Old Name']);
    $photo = UploadedFile::fake()->image('updated.jpg')->size(100);

    $this->actingAs($user)
        ->put(route('cost-centers.update', $costCenter), [
            'name' => 'Updated Name',
            'address' => $costCenter->address,
            'contact_email' => $costCenter->contact_email,
            'phone' => $costCenter->phone,
            'photo' => $photo,
        ])
        ->assertRedirect(route('cost-centers.index'))
        ->assertSessionHas('success');

    $this->assertDatabaseHas('cost_centers', [
        'id' => $costCenter->id,
        'name' => 'Updated Name',
    ]);
    Storage::disk('public')->assertExists($costCenter->fresh()->photo);
});

it('deletes a cost center', function () {
    $user = User::factory()->create();
    $costCenter = CostCenter::factory()->create();

    $this->actingAs($user)
        ->delete(route('cost-centers.destroy', $costCenter))
        ->assertRedirect(route('cost-centers.index'))
        ->assertSessionHas('success');

    $this->assertSoftDeleted('cost_centers', [
        'id' => $costCenter->id,
    ]);
});
