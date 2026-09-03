<?php

namespace Modules\Audits\Services;

use Modules\Audits\Repositories\CashRegisterClosureRepository;

class CashRegisterClosureService
{
    public function __construct(private CashRegisterClosureRepository $repository) {}
    public function create($data)
    {
        $data = $this->calculateCash($data);
        return $this->repository->create($data);
    }
    public function show($cashRegisterClosureId)
    {

    }

    public function getAll()
    {
        return $this->repository->getAll();
    }

    public function getById($cashRegisterClosureId)
    {
        return $this->repository->getById($cashRegisterClosureId);
    }

    // Calculates cash = bills_100000 + bills_5000 etc set $data['cash' => total]
    private function calculateCash($data)
    {
        $cash = 0;
        $cash += $data['bills_50000'] * 50000;
        $cash += $data['bills_100000']* 100000;
        $cash += $data['bills_20000']* 20000;
        $cash += $data['bills_10000'] * 10000;
        $cash += $data['bills_5000'] * 5000;
        $cash += $data['bills_2000'] * 2000;
        $cash += $data['coins_1000'] * 1000;
        $cash += $data['coins_500'] * 500;
        $cash += $data['coins_200'] * 200;
        $cash += $data['coins_100'] * 100;
        $cash += $data['coins_50'] * 50;
        $data['cash'] = $cash;
        return $data;
    }
}