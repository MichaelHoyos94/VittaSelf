<?php

namespace App\Http\Controllers\HumanResources;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HumanResourcesController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('HumanResources/Index', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $data_user = $request->validate(
            [
                'name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|confirmed',
                'phone' => 'required',
                'document_number' => 'required|unique:users,document_number'
            ]
        );

        User::create([
            'name' => $data_user['name'],
            'last_name' => $data_user['last_name'],
            'email' => $data_user['email'],
            'password' => bcrypt($data_user['password']),
            'phone' => $data_user['phone'],
            'document_number' => $data_user['document_number']
        ]);
        return redirect()->route('human-resources.index')->with('message', 'User created successfully.');
    }
}
