<?php

namespace Modules\Sanctions\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Sanctions\Http\Requests\ResolutionRequest;
use Modules\Sanctions\Services\ResolutionService;

class ResolutionsController extends Controller
{

    public function __construct(protected ResolutionService $service) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('sanctions::index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ResolutionRequest $request)
    {
        $validated = $request->validated();
        $resolution = $this->service->store($validated);
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('sanctions::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('sanctions::edit');
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
