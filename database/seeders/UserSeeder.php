<?php

namespace Database\Seeders;

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
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
            ],
        ];
        DB::table('users')->insert($users);
    }
}
