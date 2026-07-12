<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CashRegisterController extends Controller
{
    public function __construct() {}
    public function index()
    {
        return Inertia::render('CashRegisterManage/CashRegisters/Index');
    }
}
