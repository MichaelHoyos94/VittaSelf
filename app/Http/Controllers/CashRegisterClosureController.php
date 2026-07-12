<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CashRegisterClosureController extends Controller
{
    public function __construct() {}
    public function index()
    {
        return Inertia::render('CashRegisterManage/CashRegisterClosings/Index');
    }
}