<?php

namespace Modules\Sanctions\Database\Seeders;

use Illuminate\Database\Seeder;

class CatSanctionsLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = [
            [
                'code' => 'MINOR',
                'sanction_level' => 'Menor',
                'sanction_level_description' => 'La infracción no genera ningun prejuicio a VittaSelf.',
            ],
            [
                'code' => 'MODERATE',
                'sanction_level' => 'MODERATE',
                'sanction_level_description' => 'La infracción genera un prejuicio moderado a VittaSelf.',
            ],
            [
                'code' => 'SERIOUS',
                'sanction_level' => 'SERIOUS',
                'sanction_level_description' => 'La infracción genera un prejuicio grave a VittaSelf, resultando en perdidas econocicas o de reputación significativas.',
            ],
        ];

        // Completa las demás columnas requeridas antes de insertar.
        // \Modules\Sanctions\Models\CatSanctionLevel::query()->upsert($records, ['code']);
    }
}
