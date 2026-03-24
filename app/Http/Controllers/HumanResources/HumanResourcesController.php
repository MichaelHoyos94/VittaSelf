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
        ])->with('success', 'User created successfully.');
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
        return redirect()->route('human-resources.index')->with('success', 'User created successfully.');
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data_user = $request->validate(
            [
                'name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email|unique:users,email,' . $user->id,
                'password' => 'nullable|confirmed',
                'phone' => 'required',
                'document_number' => 'required|unique:users,document_number,' . $user->id
            ]
        );

        $user->update([
            'name' => $data_user['name'],
            'last_name' => $data_user['last_name'],
            'email' => $data_user['email'],
            'password' => isset($data_user['password']) ? bcrypt($data_user['password']) : $user->password,
            'phone' => $data_user['phone'],
            'document_number' => $data_user['document_number']
        ]);

        return redirect()->route('human-resources.index')->with('success', 'User updated successfully.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('human-resources.index')->with('success', 'User deleted successfully.');
    }
}
