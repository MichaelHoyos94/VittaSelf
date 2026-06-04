<?php

namespace Modules\Audits\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QualityChecklistsController extends Controller
{
    public function index() {
        return Inertia::render('Audits/QualityChecklists/Index');
    }

    public function store(Request $request) {}
}
