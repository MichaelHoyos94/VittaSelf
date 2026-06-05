<?php

namespace Modules\Audits\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QualityChecklistsController extends Controller
{
    public function index() {
        // Load curren user -> costcenter
        $costCenter = auth()->user()->costCenter;
        return Inertia::render('Audits/QualityChecklists/Index')->with([
            'costCenter' => $costCenter,
        ]);
    }

    public function store(Request $request) {}
}
