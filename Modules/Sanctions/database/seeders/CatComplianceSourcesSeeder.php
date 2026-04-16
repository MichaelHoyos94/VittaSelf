<?php

namespace Modules\Sanctions\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Sanctions\Models\CatComplianceSource;

class CatComplianceSourcesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = [
            [
                'code' => 'INTERNAL_INVESTIGATION',
                'source' => 'Investigación interna',
                'description' => 'VittaSelf realiza una investigació interna de sus empresarios.',
                'active' => true,
            ],
            [
                'code' => 'SOCIAL_MEDIA',
                'source' => 'Redes sociales',
                'description' => 'Publicaciones en X, Facebook, Instagram o cualquier otra red social donde se evidencie una infracción.',
                'active' => true,
            ],
            [
                'code' => 'CUSTOMER_COMPLAINT',
                'source' => 'Queja de cliente',
                'description' => 'Un cliente se ha puesto en contacto con VittaSelf para presentar una queja formal.',
                'active' => true,
            ],
            [
                'code' => 'EUI_COMPLAINT',
                'source' => 'Queja de empresario',
                'description' => 'Un empresario notifica a VittaSelf sobre la infracción de otro.',
                'active' => true,
            ],
            [
                'code' => 'NEWS',
                'source' => 'Noticias',
                'description' => 'Noticias en revistas, TV o cualquier otro medio',
                'active' => true,
            ],
        ];

        CatComplianceSource::query()->upsert(
            $records,
            ['code'],
            ['source', ]
        )
    }
}
