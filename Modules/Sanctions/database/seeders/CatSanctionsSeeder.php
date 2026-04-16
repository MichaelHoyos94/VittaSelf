<?php

namespace Modules\Sanctions\Database\Seeders;

use Illuminate\Database\Seeder;

class CatSanctionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = [
            ['code' => 'FREEZE_PLAN'],
            ['code' => 'FREEZE_POINTS'],
            ['code' => 'SUSPEND_ACCOUNT'],
            ['code' => 'SUSPEND_CODE'],
            ['code' => 'DOWNGRADE_PLAN'],
            ['code' => 'TERMINATE_ACCOUNT'],
        ];

        // Completa las demás columnas requeridas antes de insertar.
        // \Modules\Sanctions\Models\CatSanction::query()->upsert($records, ['code']);
    }
}
