<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'code' => 'ASTEROID',
                'name' => 'Asteroid',
                'logo' => 'asteroid.png',
                'description' => 'Asteroid plan description.',
                'min_points' => 1,
                'next_code' => 'COMET',
                'previous_code' => null,
            ],
            [
                'code' => 'COMET',
                'name' => 'Comet',
                'logo' => 'comet.png',
                'description' => 'Comet plan description.',
                'min_points' => 18,
                'next_code' => 'PLANET',
                'previous_code' => 'ASTEROID',
            ],
            [
                'code' => 'PLANET',
                'name' => 'Planet',
                'logo' => 'planet.png',
                'description' => 'Planet plan description.',
                'min_points' => 32,
                'next_code' => 'STAR',
                'previous_code' => 'COMET',
            ],
            [
                'code' => 'STAR',
                'name' => 'Star',
                'logo' => 'star.png',
                'description' => 'Star plan description.',
                'min_points' => 64,
                'next_code' => 'GALAXY',
                'previous_code' => 'PLANET',
            ],
            [
                'code' => 'GALAXY',
                'name' => 'Galaxy',
                'logo' => 'galaxy.png',
                'description' => 'Galaxy plan description.',
                'min_points' => 128,
                'next_code' => null,
                'previous_code' => 'STAR',
            ],
        ];
        Plan::query()->upsert(
            collect($plans)->map(fn($plan) => [
                'code' => $plan['code'],
                'name' => $plan['name'],
                'logo' => $plan['logo'],
                'description' => $plan['description'],
                'min_points' => $plan['min_points'],
            ])->toArray(),
            ['code'],
            ['name', 'logo', 'description', 'min_points']
        );
        foreach ($plans as $plan) {
            $currentPlan = Plan::where('code', $plan['code'])->firstOrFail();
            $nextPlanId = null;
            $previousPlanId = null;

            if ($plan['next_code']) {
                $nextPlanId = Plan::where('code', $plan['next_code'])->value('id');
            }

            if ($plan['previous_code']) {
                $previousPlanId = Plan::where('code', $plan['previous_code'])->value('id');
            }

            $currentPlan->update([
                'next_plan_id' => $nextPlanId,
                'previous_plan_id' => $previousPlanId,
            ]);
        }
    }
}
