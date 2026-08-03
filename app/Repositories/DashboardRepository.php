<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\User;

class DashboardRepository
{

    // ==================================================== EUI ==================================================== //

    public function getEuisCount()
    {
        // Count users with role relation = eui
        return User::whereHas('roles', function ($query) {
            $query->where('name', 'eui');
        })->count();
    }

    public function getEuisRegisteredThisMountCount()
    {
        return User::whereHas('roles', function ($query) {
            $query->where('name', 'eui');
        })->whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->count();
    }

    public function getEuisRegisteredThisYearCount()
    {
        return User::whereHas('roles', function ($query) {
            $query->where('name', 'eui');
        })->whereYear('created_at', now()->year)
        ->count();
    }

    public function getEuisByPlanCount()
    {
        // Group by plan including null as "no plan" and count
        return User::whereHas('roles', function ($query) {
            $query->where('name', 'eui');
        })->with('plan')
            ->get()
            ->groupBy(function ($user) {
                return $user->plan?->name ?? 'No Plan';
            })
            ->map(function ($users, $plan) {
                return [
                    'plan' => $plan,
                    'count' => $users->count(),
                ];
            })
            ->values();
    }

    // ==================================================== EMPLOYEES ==================================================== //

    public function usersByRole()
    {
        // Count roles with roles excep "eui" rol
        return User::whereDoesntHave('roles', function ($query) {
                $query->where('name', 'eui')
                ->orWhere('name', 'super-admin');
            })
            ->with('roles')
            ->get()
            ->groupBy(function ($user) {
                return $user->roles->pluck('name')->first();
            })
            ->map(function ($users, $role) {
                return [
                    'role' => $role,
                    'count' => $users->count(),
                ];
            })
            ->values();
    }

    // ==================================================== ORDERS ==================================================== //

    public function getCurrentMonthWebOrdersCount()
    {
        // Count orders current month
        return Order::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->count();
    }

    public function getMonthlyWebOrdersCount($from = null, $to = null)
    {
        // Count orders by month
        $query = Order::query();

        if ($from) {
            $query->whereDate('created_at', '>=', $from);
        }

        if ($to) {
            $query->whereDate('created_at', '<=', $to);
        }

        return $query->selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->get();
    }
}
