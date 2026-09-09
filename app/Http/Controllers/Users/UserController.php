<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Sanctions\Exceptions\UserSanctionedException;

class UserController extends Controller
{
    public function __construct(private UserService $userService) {}

    public function index(Request $request)
    {
        $search = $request->filled('search') ? $request->input('search') : null;
        $users = $this->userService->getAll($search);
        $representativeCandidate = $this->userService->getRepresentativeCandidate(
            $request->input('representative_eui_code')
        );

        return Inertia::render('Customers/Index')->with([
            'users' => $users,
            'representativeCandidate' => $representativeCandidate,
        ]);
    }

    public function store(UserRequest $request)
    {
        $data = $request->validated();

        try {
            $this->userService->create($data);
        } catch (UserSanctionedException $exception) {
            return redirect()
                ->route('customers.index')
                ->with('error', $exception->getMessage());
        }

        return redirect()->route('customers.index')->with('success', 'Eui created successfully.');
    }

    public function myReferrals(Request $request)
    {
        $representedUsers = $this->userService->getRepresentedUsers($request->user());

        return Inertia::render('Customers/MyReferrals')->with([
            'representedUsers' => $representedUsers,
        ]);
    }
}
