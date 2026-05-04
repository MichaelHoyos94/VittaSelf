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
                'code' => 'UNASSIGNED',
                'case_status' => 'Sin asignar',
                'case_status_description' => 'El caso no tiene un administrador asignado.',
                'next_code' => 'OPEN',
            ],
            [
                'code' => 'OPEN',
                'case_status' => 'Abierto',
                'case_status_description' => 'El caso fue creado y se encuentra en etapa inicial de investigacion.',
                'next_code' => 'AWAITING_EVIDENCES',
            ],
            [
                'code' => 'AWAITING_EVIDENCES',
                'case_status' => 'Esperando evidencias',
                'case_status_description' => 'El caso esta a la espera de soportes o pruebas adicionales por parte del usuario o del administrador.',
                'next_code' => 'ON_RESOLUTION',
            ],
            [
                'code' => 'ON_RESOLUTION',
                'case_status' => 'En resolucion',
                'case_status_description' => 'La investigacion finalizo y el caso se encuentra en etapa de analisis y emision de resolucion.',
                'next_code' => 'CLOSED',
            ],
            [
                'code' => 'CLOSED',
                'case_status' => 'Cerrado',
                'case_status_description' => 'El caso ya cuenta con una decision final y no tiene actuaciones pendientes.',
                'next_code' => null,
            ],
        ];

        CatCaseStatus::query()->upsert(
            collect($records)->map(fn($record) => [
                'code' => $record['code'],
                'case_status' => $record['case_status'],
                'case_status_description' => $record['case_status_description'],
            ])->toArray(),
            ['code'],
            ['case_status', 'case_status_description']
        );

        // Configurar las relaciones de siguiente estado después de insertar los registros para evitar problemas de claves foráneas
        foreach ($records as $record) {
            $status = CatCaseStatus::where('code', $record['code'])->firstOrFail();

            $nextStatusId = null;

            if ($record['next_code']) {
                $nextStatusId = CatCaseStatus::where('code', $record['next_code'])
                    ->value('id');
            }

            $status->update([
                'next_status_id' => $nextStatusId,
            ]);
        }
    }
}
