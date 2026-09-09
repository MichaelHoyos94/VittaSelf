<?php

namespace Database\Seeders;

use App\Enums\PermissionName;
use App\Enums\RoleName;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();
        $guard = 'web';

        $permissions = array_map(
            static fn(PermissionName $permission): string => $permission->value,
            PermissionName::cases()
        );

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => $guard,
            ]);
        }

        $superAdmin = Role::firstOrCreate([
            'name' => RoleName::SUPER_ADMIN->value,
            'guard_name' => $guard,
        ]);

        $administrator = Role::firstOrCreate([
            'name' => RoleName::ADMINISTRATOR->value,
            'guard_name' => $guard,
        ]);

        $commercialAgent = Role::firstOrCreate([
            'name' => RoleName::COMMERCIAL_AGENT->value,
            'guard_name' => $guard,
        ]);

        $eui = Role::firstOrCreate([
            'name' => RoleName::EUI->value,
            'guard_name' => $guard,
        ]);

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
