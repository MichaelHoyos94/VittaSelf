<?php

namespace Modules\Sanctions\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Sanctions\Models\CatMitigation;

class CatMitigationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = [
            [
                'code' => 'COPERATES',
                'mitigation' => 'Colabora con la investigación',
                'description' => 'El empresario colabora activamente con la investigación.',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'ACCEPT_FAULT',
                'mitigation' => 'Acepta su infracción',
                'description' => 'El empresario acepta su infraccion, evitando una investigación.',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'FIRST_INFRACTION',
                'mitigation' => 'Primera infraccion',
                'description' => 'Esta es la primera vez que el empresario comete una infracción.',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'COMPENSATES_VITTASELF',
                'mitigation' => 'Compensación a VittaSelf',
                'description' => 'El empresario ha compensado a VittaSelf por cualquier daño o prejuicio causado.',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'COMPENSATES_CUSTOMER',
                'mitigation' => 'Compensacion a cliente afectado',
                'description' => 'El empresario compensó al cliente afectado, evitando responsabilidades a VittaSelf.',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        CatMitigation::query()->upsert(
            $records,
            ['CODE'],
            ['mitigation', 'description', 'active']
        );

        // Completa las demás columnas requeridas antes de insertar.
        // \Modules\Sanctions\Models\CatMitigation::query()->upsert($records, ['code']);
    }
}
