<?php

namespace Modules\Sanctions\Database\Seeders;

use Illuminate\Database\Seeder;

class SanctionsDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            CatSanctionsSeeder::class,
            CatMitigationsSeeder::class,
            CatComplianceSourcesSeeder::class,
            CatSanctionsLevelSeeder::class,
            CatCaseStatusesSeeder::class,
            CatPoliciesSeeder::class,
        ]);
    }
}
