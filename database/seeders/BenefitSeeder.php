<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BenefitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $benefits = [
            [
                'code' => 'DISCOUNT_20_PERCENT',
                'name' => '20% Discount',
                'type' => 'discount',
                'description' => 'Get a 20% discount on your order.',
                'value' => 20.00,
                'config' => ['mode' => 'percentage'],
                'plan_code' => 'ASTEROID',
            ],
            [
                'code' => '10_MEMBERS',
                'name' => '10 Members',
                'type' => 'number_of_partners',
                'description' => 'Access to exclusive network features.',
                'value' => 10,
                'config' => null,
                'plan_code' => 'ASTEROID',
            ],
            [
                'code' => 'DISCOUNT_24_PERCENT',
                'name' => '24% Discount',
                'type' => 'discount',
                'description' => 'Get a 24% discount on your order.',
                'value' => 24,
                'config' => ['mode' => 'percentage'],
                'plan_code' => 'COMET',
            ],
            [
                'code' => 'SHIPPING_DISCOUNT_10_PERCENT',
                'name' => '10% Discount on shipping',
                'type' => 'shipping_discount',
                'description' => 'Get a 10% discount on your shipping order.',
                'value' => 10,
                'config' => ['mode' => 'percentage'],
                'plan_code' => 'COMET',
            ],
            [
                'code' => '30_MEMBERS',
                'name' => '30 Members',
                'type' => 'number_of_partners',
                'description' => 'Access to exclusive network features.',
                'value' => 30,
                'config' => null,
                'plan_code' => 'COMET',
            ],
            [
                'code' => 'DISCOUNT_28_PERCENT',
                'name' => '28% Discount',
                'type' => 'discount',
                'description' => 'Get a 28% discount on your order.',
                'value' => 28,
                'config' => ['mode' => 'percentage'],
                'plan_code' => 'PLANET',
            ],
            [
                'code' => 'SHIPPING_DISCOUNT_15_PERCENT',
                'name' => '15% Discount on shipping',
                'type' => 'shipping_discount',
                'description' => 'Get a 15% discount on your shipping order.',
                'value' => 15,
                'config' => ['mode' => 'percentage'],
                'plan_code' => 'PLANET',
            ],
            [
                'code' => '50_MEMBERS',
                'name' => '50 Members',
                'type' => 'number_of_partners',
                'description' => 'Access to exclusive network features.',
                'value' => 50,
                'config' => null,
                'plan_code' => 'PLANET',
            ],
        ];

        $planIds = Plan::query()
            ->whereIn('code', collect($benefits)->pluck('plan_code')->unique())
            ->pluck('id', 'code');

        $benefits = collect($benefits)->map(function (array $benefit) use ($planIds): array {
            $planCode = $benefit['plan_code'];
            unset($benefit['plan_code']);

            $benefit['plan_id'] = $planIds->get($planCode)
                ?? throw new \RuntimeException("Plan [{$planCode}] not found. Run PlanSeeder first.");
            $benefit['config'] = $benefit['config'] === null
                ? null
                : json_encode($benefit['config'], JSON_THROW_ON_ERROR);

            return $benefit;
        })->all();

        DB::table('benefits')->upsert(
            $benefits,
            ['code'],
            ['name', 'type', 'description', 'value', 'config', 'plan_id']
        );
    }
}
