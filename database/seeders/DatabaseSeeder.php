<?php

namespace Database\Seeders;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ProductsSeeder::class,
            CostCenterSeeder::class,
            RolesAndPermissionsSeeder::class,
            PlanSeeder::class,
            BenefitSeeder::class,
            UserSeeder::class,
        ]);
    }
}
