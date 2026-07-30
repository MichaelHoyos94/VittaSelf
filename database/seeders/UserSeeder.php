<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
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
                'name' => 'Michael',
                'last_name' => 'Hoyos',
                'document_number' => '1094944787',
                'email' => 'asesor-armenia@vittaself.com',
                'phone' => '3212884211',
                'address' => 'Cll 21 # 23 - 55',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Laura',
                'last_name' => 'Perez',
                'document_number' => '1094934937',
                'email' => 'laurape@gmail.com',
                'phone' => '3112828990',
                'address' => 'Av Bolivar # 23 n - 1, Armenia',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
            ],
        ];
        DB::table('users')->insert($users);
        $this->assign();
    }

    private function assign() {
        $user = User::where('email', 'sistemas@vittaself.com')->first();
        $user->assignRole('super-admin');
        $user = User::where('email', 'sistemasaux@vittaself.com')->first();
        $user->assignRole('administrator');
        $user = User::where('email', 'asesor-armenia@vittaself.com')->first();
        $user->assignRole('commercial-agent');
        $user = User::where('email', 'laurape@gmail.com')->first();
        $user->assignRole('eui');
    }
}
