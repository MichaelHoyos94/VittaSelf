<?php

namespace Modules\Sanctions\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Sanctions\Models\CatPolicy;

class CatPoliciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = [
            [
                'code' => 'EUI_NETWORK_SUSTRACTION',
                'policy' => 'Sustraccion de redes a otro empresario',
                'section' => '1.9 Responsabilidades del empresario',
                'numeral' => '1.9.1 Sustracción de redes a otro empresario',
                'description' => 'El empresario no podrá sustraer redes a otro empresario.',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'EXAGERATED_AFFIRMATIONS',
                'policy' => 'Afirmaciones exageradas',
                'section' => '2.3 Malas prácticas comerciales',
                'numeral' => '2.3.1 Afirmaciones exageradas',
                'description' => 'Exagerar o realizar afirmaciones no garantizadas sobre los productos y servicios Lifehuni diferentes a las impresas en la literatura oficial.',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'PRODUCTS_PRESENTATION',
                'policy' => 'Presentación de productos',
                'section' => '2.3 Malas prácticas comerciales',
                'numeral' => '2.3.2 Presentación de productos',
                'description' => 'El empresario no debe modificar la presentación de los productos, incluyendo pero no limitándose a su empaque y etiquetado.',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],            
        ];
        CatPolicy::query()->upsert(
            $records,
            ['CODE'],
            ['policy', 'description', 'active']
        );
    }
}
