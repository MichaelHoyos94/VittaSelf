<?php

namespace App\Repositories;

use App\Models\InternalOrder;
use App\Models\Order;
use App\Models\User;
use Modules\Sanctions\Models\DisciplinaryCase;

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

    public function getEuisRegisteredByMount()
    {
        return User::whereHas('roles', function ($query) {
            $query->where('name', 'eui');
        })->whereYear('created_at', now()->year)
            ->selectRaw('MONTHNAME(created_at) as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->get();
    }

    // ==================================================== EMPLOYEES ==================================================== //

    public function getEmployeesCount()
    {
        // NO eui role, NO super-admin role
        return User::whereDoesntHave('roles', function ($query) {
            $query->where('name', 'eui')
                ->orWhere('name', 'super-admin');
        })->count();
    }

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

    public function getCurrentYearWebOrdersCount()
    {
        // Count orders current month
        return Order::whereYear('created_at', now()->year)
            ->count();
    }

    public function getCurrentYearInternalOrders()
    {
        return InternalOrder::whereYear('created_at', now()->year)
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

        return $query->whereYear('created_at', now()->year)
            ->selectRaw('MONTHNAME(created_at) as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->get();
    }

    // ======================================== Sanctions ======================================== //

    public function getDisciplinaryCasesCount()
    {
        return DisciplinaryCase::count();
    }

    public function getDisciplinaryCasesUnassignedCount()
    {
        return DisciplinaryCase::whereHas('caseStatus', function ($query) {
            $query->where('code', 'UNASSIGNED');
        })
            ->count();
    }

    public function getDisciplinaryCasesOpenCount()
    {
        return DisciplinaryCase::whereHas('caseStatus', function ($query) {
            $query->where('code', 'OPEN');
        })
            ->count();
    }

    public function getDisciplinaryCasesAwaitingEvidencesCount()
    {
        return DisciplinaryCase::whereHas('caseStatus', function ($query) {
            $query->where('code', 'AWAITING_EVIDENCES');
        })
            ->count();
    }

    public function getDisciplinaryCasesOnResolutionCount()
    {
        return DisciplinaryCase::whereHas('caseStatus', function ($query) {
            $query->where('code', 'ON_RESOLUTION');
        })
            ->count();
    }

    public function getDisciplinaryCasesClosedCount()
    {
        return DisciplinaryCase::whereHas('caseStatus', function ($query) {
            $query->where('code', 'CLOSED');
        })
            ->count();
    }

    // ============================================ Audits ============================================== //

    public function getProductCountAuditsCount()
    {

    }

    public function getCashRegisterClosureAuditsCount()
    {
        
    }

    public function getQualityChecklistAuditsCount()
    {
        
    }
}
