<?php

namespace Modules\Sanctions\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Sanctions\Http\Requests\PolicyRequest;
use Modules\Sanctions\Models\CatPolicy;
use Modules\Sanctions\Repositories\CatPolicyRepository;

class SettingsController extends Controller
{

    public function __construct(private CatPolicyRepository $repository) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Sanctions/Settings/Index');
    }

    public function policies()
    {
        return Inertia::render('Sanctions/Settings/Policies/Index')->with([
            'policies' => CatPolicy::all(),
        ]);
    }

    public function storePolicy(PolicyRequest $request)
    {
        $validated = $request->validated();

        $policy = $this->repository->create($validated);

        return redirect()->route('sanctions.settings.policies.index')->with('success', 'Policy created successfully.');
    }

    public function updatePolicy(PolicyRequest $request, $id)
    {
        $validated = $request->validated();

        $policy = $this->repository->update($id, $validated);

        return redirect()->route('sanctions.settings.policies.index')->with('success', 'Policy updated successfully.');
    }

    public function activatePolicy($id)
    {
        $policy = $this->repository->activate($id);

        return redirect()->route('sanctions.settings.policies.index')->with('success', 'Policy activated successfully.');
    }

    public function inactivatePolicy($id)
    {
        $policy = $this->repository->inactivate($id);

        return redirect()->route('sanctions.settings.policies.index')->with('success', 'Policy inactivated successfully.');
    }
}
