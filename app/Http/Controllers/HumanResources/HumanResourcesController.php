<?php

namespace App\Http\Controllers\HumanResources;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeePutRequest;
use App\Http\Requests\EmployeeRequest;
use App\Models\User;
use App\Services\CostCenterService;
use App\Services\HumanResourcesService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class HumanResourcesController extends Controller
{

    public function __construct(
        private HumanResourcesService $service,
        private CostCenterService $costCenterService,
        ) {}

    public function index(Request $request)
    {
        $search = $request->input('search');
        $users = $this->service->getAll($search);
        $costCenters = $this->costCenterService->getAll();
        $roles = Role::where('name', '!=', 'super-admin')->where('name', '!=', 'eui')->get();
        return Inertia::render('HumanResources/Index', [
            'users' => $users,
            'costCenters' => $costCenters,
            'roles' => $roles,
        ]);
    }

    public function store(EmployeeRequest $request)
    {
        $data = $request->validated();
        $user = $this->service->create($data);
        $user->refresh();
        return redirect()->route('human-resources.index')->with('success', "User {$user->full_name} created successfully.");
    }

    public function update(EmployeePutRequest $request, int $employeeId)
    {
        $data = $request->validated();
        $user = $this->service->update($data, $employeeId);
        $user->refresh();
        return redirect()->route('human-resources.index')->with('success', "User {$user->full_name} updated successfully.");
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('human-resources.index')->with('success', 'User deleted successfully.');
    }
}
