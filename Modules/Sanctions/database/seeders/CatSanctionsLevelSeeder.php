<?php

namespace Modules\Sanctions\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Sanctions\Models\CatSanctionLevel;

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

        CatSanctionLevel::query()->upsert(
            $records,
            ['code'],
            ['sanction_level', 'sanction_level_description']
        );
    }
}
