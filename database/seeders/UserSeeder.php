<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Michael',
                'last_name' => 'Aguirre',
                'document_number' => '10949447885',
                'email' => 'sistemas@vittaself.com',
                'phone' => '3218095138',
                'address' => 'Cra 12 # 32 - 93',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Alejandro',
                'last_name' => 'Aguirre',
                'document_number' => '10949447886',
                'email' => 'sistemasaux@vittaself.com',
                'phone' => '3012884210',
                'address' => 'Cra 13 # 23 - 94',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Carlos Andres',
                'last_name' => 'Garcia',
                'document_number' => '1094944787',
                'email' => 'asesor-armenia@vittaself.com',
                'phone' => '3212884211',
                'address' => 'Cll 21 # 23 - 55',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
            ],
        ];
        foreach ($users as $user) {
            $model = User::withTrashed()->firstOrNew(['email' => $user['email']]);

            if (! $model->exists) {
                $model->password = $user['password'];
                $model->remember_token = $user['remember_token'];
            }

            $model->fill([
                'name' => $user['name'],
                'last_name' => $user['last_name'],
                'document_number' => $user['document_number'],
                'phone' => $user['phone'],
                'address' => $user['address'],
            ]);

            $model->email_verified_at = $user['email_verified_at'];
            $model->deleted_at = null;
            $model->save();
        }

        $this->assign();
    }

    private function assign()
    {
        $user = User::where('email', 'sistemas@vittaself.com')->first();
        $user?->assignRole('super-admin');
        $user = User::where('email', 'sistemasaux@vittaself.com')->first();
        $user?->assignRole('administrator');
        $user = User::where('email', 'asesor-armenia@vittaself.com')->first();
        $user?->assignRole('commercial-agent');
    }
}
