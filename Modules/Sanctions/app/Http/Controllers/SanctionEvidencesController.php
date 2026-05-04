<?php

namespace Modules\Sanctions\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Sanctions\Services\SanctionEvidenceService;

class SanctionEvidencesController extends Controller
{
    public function __construct(protected SanctionEvidenceService $service) {}
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
    public function store(Request $request, $disciplinaryCaseId) {
        $request->validate([
            'evidence_description' => 'required|string|max:255',
            'evidences.*' => 'required|file|max:10240', // Max 10MB per file
        ]);

        $evidences = $request->file('evidences');
        $description = $request->input('evidence_description');

        $this->service->storeEvidences($disciplinaryCaseId, $evidences, $description);

        return redirect()->route('sanctions.manage-case', ['id' => $disciplinaryCaseId])
                         ->with('success', 'Evidences uploaded successfully.');
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
