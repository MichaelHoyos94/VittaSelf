<?php

namespace Modules\Sanctions\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Sanctions\Models\CatCaseStatus;

class CatCaseStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = [
            [
                'code' => 'OPEN',
                'case_status' => 'Abierto',
                'case_status_description' => 'El caso fue creado y se encuentra en etapa inicial de investigacion.',
            ],
            [
                'code' => 'AWAITING_EVIDENCES',
                'case_status' => 'Esperando evidencias',
                'case_status_description' => 'El caso esta a la espera de soportes o pruebas adicionales por parte del usuario o del administrador.',
            ],
            [
                'code' => 'ON_RESOLUTION',
                'case_status' => 'En resolucion',
                'case_status_description' => 'La investigacion finalizo y el caso se encuentra en etapa de analisis y emision de resolucion.',
            ],
            [
                'code' => 'CLOSED',
                'case_status' => 'Cerrado',
                'case_status_description' => 'El caso ya cuenta con una decision final y no tiene actuaciones pendientes.',
            ],
        ];

        CatCaseStatus::query()->upsert(
            $records,
            ['code'],
            ['case_status', 'case_status_description']
        );
    }
}
