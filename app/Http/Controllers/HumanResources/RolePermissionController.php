<?php

namespace App\Http\Controllers\HumanResources;

use App\Enums\RoleName;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller
{
    public function index(): Response
    {
        $guard = config('auth.defaults.guard', 'web');

        $permissions = Permission::query()
            ->where('guard_name', $guard)
            ->orderBy('name')
            ->get(['id', 'name', 'guard_name']);

        $permissionIds = $permissions->pluck('id')->values();

        $roles = Role::query()
            ->where('guard_name', $guard)
            ->with('permissions:id,name')
            ->orderBy('name')
            ->get(['id', 'name', 'guard_name'])
            ->map(function (Role $role) use ($permissionIds): array {
                $isEditable = $role->name !== RoleName::SUPER_ADMIN->value;

                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'is_editable' => $isEditable,
                    'permission_ids' => $isEditable
                        ? $role->permissions->pluck('id')->values()
                        : $permissionIds,
                ];
            });

        return Inertia::render('HumanResources/Permissions/Index', [
            'roles' => $roles,
            'permissions' => $permissions->map(fn (Permission $permission): array => [
                'id' => $permission->id,
                'name' => $permission->name,
            ]),
        ]);
    }

    public function update(Request $request, Role $role): RedirectResponse
    {
        if ($role->name === RoleName::SUPER_ADMIN->value) {
            throw ValidationException::withMessages([
                'role' => 'The super administrator always has full access and cannot be modified.',
            ]);
        }

        $validated = $request->validate([
            'permissions' => ['present', 'array'],
            'permissions.*' => [
                'integer',
                'distinct',
                Rule::exists(config('permission.table_names.permissions'), 'id')
                    ->where('guard_name', $role->guard_name),
            ],
        ]);

        $role->syncPermissions($validated['permissions']);

        return back()->with('success', "Permissions for {$role->name} were updated.");
    }
}
