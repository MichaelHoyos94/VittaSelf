<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function __construct(private DashboardService $service) {}

    public function index()
    {
        $data = $this->service->getData();
        return Inertia::render('Dashboard')->with([
            'data' => $data,
        ]);
    }
}
