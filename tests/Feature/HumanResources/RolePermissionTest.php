<?php

use App\Enums\RoleName;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    $this->withoutVite();
});

test('guests cannot open the role permission manager', function () {
    $this->get(route('human-resources.permissions'))
        ->assertRedirect(route('login'));
});

test('a user with roles view permission can open the role permission manager', function () {
    $viewPermission = Permission::create(['name' => 'roles.view']);
    $managedPermission = Permission::create(['name' => 'employees.view']);
    $role = Role::create(['name' => 'administrator']);
    $role->givePermissionTo($managedPermission);

    $user = User::factory()->create();
    $user->givePermissionTo($viewPermission);

    $this->actingAs($user)
        ->get(route('human-resources.permissions'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('HumanResources/Permissions/Index')
            ->has('roles', 1)
            ->where('roles.0.id', $role->id)
            ->where('roles.0.permission_ids', [$managedPermission->id])
            ->has('permissions', 2)
        );
});

test('a user without roles view permission cannot open the manager', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('human-resources.permissions'))
        ->assertForbidden();
});

test('role permissions can be synchronized', function () {
    $assignPermission = Permission::create(['name' => 'roles.assign']);
    $oldPermission = Permission::create(['name' => 'employees.view']);
    $newPermission = Permission::create(['name' => 'employees.update']);
    $role = Role::create(['name' => 'commercial-agent']);
    $role->givePermissionTo($oldPermission);

    $user = User::factory()->create();
    $user->givePermissionTo($assignPermission);

    $this->actingAs($user)
        ->put(route('human-resources.permissions.update', $role), [
            'permissions' => [$newPermission->id],
        ])
        ->assertSessionHasNoErrors()
        ->assertSessionHas('success');

    expect($role->fresh()->permissions->pluck('id')->all())
        ->toBe([$newPermission->id]);
});

test('the super administrator permissions cannot be modified', function () {
    $permission = Permission::create(['name' => 'employees.view']);
    $superAdmin = Role::create(['name' => RoleName::SUPER_ADMIN->value]);
    $user = User::factory()->create();
    $user->assignRole($superAdmin);

    $this->actingAs($user)
        ->put(route('human-resources.permissions.update', $superAdmin), [
            'permissions' => [$permission->id],
        ])
        ->assertSessionHasErrors('role');

    expect($superAdmin->fresh()->permissions)->toHaveCount(0);
});
