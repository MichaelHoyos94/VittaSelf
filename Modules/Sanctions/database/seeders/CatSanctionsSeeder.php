<?php

namespace Modules\Sanctions\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Sanctions\Models\CatSanction;

class CatSanctionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = [
            [
                'code' => 'FREEZE_PLAN',
                'sanction' => 'Congelación de beneficios.',
                'description' => 'Se congelan todos los beneficios del plan asociado al empresario.',
                'active' => true,
            ],
            [
                'code' => 'FREEZE_BONUSES',
                'sanction' => 'Bloqueo de bonificaciones.',
                'description' => 'Se congelan las bonificaciones del empresario.',
                'active' => true,
            ],
            [
                'code' => 'FREEZE_POINTS',
                'sanction' => 'Congelación de puntos.',
                'description' => 'Se detiene la obtención de puntos y la progresion de plan del empresario.',
                'active' => true,
            ],
            [
                'code' => 'SUSPEND_ACCOUNT',
                'sanction' => 'Suspensión de cuenta.',
                'description' => 'Se impide al usuario durante un rango de tiempo, acceder e interactuar con el sitio.',
                'active' => true,
            ],
            [
                'code' => 'SUSPEND_CODE',
                'sanction' => 'Suspensión de codigo.',
                'description' => 'Se suspende el código del empresario, impidiendo sumar empresarios a su red.',
                'active' => true,
            ],
            [
                'code' => 'DOWNGRADE_PLAN',
                'sanction' => 'Degradación de plan.',
                'description' => 'Se degrada el plan del empresario al siguiente inferior.',
                'active' => true,
            ],
            [
                'code' => 'TERMINATE_ACCOUNT',
                'sanction' => 'Terminación de cuenta.',
                'description' => 'Se termina la cuenta del usuario, eliminando su acceso e interacción con el sitio.',
                'active' => true,
            ],
        ];

        CatSanction::query()->upsert($records, ['code'], ['sanction', 'description', 'active']);
    }
}
