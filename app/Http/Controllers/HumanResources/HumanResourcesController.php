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
        $request->validate(
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
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone,
            'document_number' => $request->document_number
        ]);
    }
}
