<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CostCenterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $costCenters = [
            [
                'name' => 'Armenia',
                'address' => 'Av Bolivar # 15 - 28',
                'contact_email' => 'infoaxm@vittaself.com',
                'phone' => '3012884899',
                'deleted_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Medellin',
                'address' => 'Carrera # 14 cll 23 - 51',
                'contact_email' => 'infomed@vittaself.com',
                'phone' => '3218097878',
                'deleted_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($costCenters as $costCenter) {
            DB::table('cost_centers')->updateOrInsert(
                ['name' => $costCenter['name']],
                $costCenter
            );
        }
    }
}
