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
}
