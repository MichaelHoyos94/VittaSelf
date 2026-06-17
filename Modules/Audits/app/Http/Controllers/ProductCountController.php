<?php

namespace Modules\Audits\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Audits\Http\Requests\ProductCountRequest;
use Modules\Audits\Services\ProductCountService;

class ProductCountController extends Controller
{
    public function __construct(private ProductCountService $service) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Audits/ProductCounts/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Audits/ProductCounts/CreateOrEdit');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductCountRequest $request) {
        $validated = $request->validated();
        $productCount = $this->service->create($validated);
        return redirect()->route('audits.product-counts.index')->with('success', 'Product count created successfully.');
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('audits::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return Inertia::render('Audits/ProductCounts/CreateOrEdit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {}
}
