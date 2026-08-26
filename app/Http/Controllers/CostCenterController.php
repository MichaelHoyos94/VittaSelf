<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCostCenterRequest;
use App\Http\Requests\UpdateCostCenterRequest;
use App\Services\CostCenterService;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CostCenterController extends Controller
{
    public function __construct(private CostCenterService $costCenterService) {}

    public function index(Request $request)
    {
        return Inertia::render('CostCenters/Index')->with([
            'costCenters' => $this->costCenterService->getAllSearch($request->input('search')),
            'filters' => [
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    public function store(StoreCostCenterRequest $request)
    {
        $this->costCenterService->create($request->validated());

        return redirect()->route('cost-centers.index')
            ->with('success', 'Cost center created successfully.');
    }

    public function update(UpdateCostCenterRequest $request, $id)
    {
        $this->costCenterService->update($id, $request->validated());

        return redirect()->route('cost-centers.index')
            ->with('success', 'Cost center updated successfully.');
    }

    public function destroy($id)
    {
        try {
            $this->costCenterService->delete($id);
        } catch (QueryException) {
            return redirect()->route('cost-centers.index')
                ->with('error', 'The cost center cannot be deleted because it is being used.');
        }

        return redirect()->route('cost-centers.index')
            ->with('success', 'Cost center deleted successfully.');
    }
}
