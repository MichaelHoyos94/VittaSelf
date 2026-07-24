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

        $administrator->syncPermissions($permissions);

        $commercialAgent->syncPermissions([
            PermissionName::INTERNAL_ORDERS_VIEW->value,
            PermissionName::INTERNAL_ORDERS_CREATE->value,
            PermissionName::QUALITY_CHECKLISTS_EXECUTE->value,
            PermissionName::CASH_COUNTS_EXECUTE->value,
            PermissionName::PRODUCT_COUNTS_EXECUTE->value,
            PermissionName::MY_CASH_REGISTER_VIEW->value,
        ]);

        $eui->syncPermissions([
            PermissionName::MY_ORDERS_VIEW->value,
            PermissionName::ORDERS_CREATE->value,
            PermissionName::PRODUCTS_CATALOG_VIEW->value,
        ]);

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
