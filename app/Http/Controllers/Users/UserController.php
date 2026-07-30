<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(private UserService $userService) {}
    public function index(Request $request)
    {
        $search = $request->filled('search') ? $request->input('search') : null;
        $users = $this->userService->getAll($search);
        return Inertia::render('Customers/Index')->with([
            'users' => $users
        ]);
    }
    public function store(UserRequest $request) {
        $data = $request->validated();
        $user = $this->userService->create($data);
        return redirect()->route('customers.index')->with([]);
    }
}
