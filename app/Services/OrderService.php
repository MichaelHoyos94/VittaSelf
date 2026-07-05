<?php

namespace App\Services;

use App\Repositories\OrderRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use Modules\Sanctions\Services\SanctionEnforcementService;

class OrderService
{
    public function __construct(private OrderRepository $repository, private CartService $cartService, private SanctionEnforcementService $sanctionEnforcementService) {}
    public function create($data)
    {
        $sanctions = $this->sanctionEnforcementService->getUserSanctions($data['user_id']);
        if ($sanctions->isNotEmpty()) {
            foreach ($sanctions as $sanction) {
                if ($sanction->BLOCK_ORDERS === true) {
                    throw new Exception('User is restricted from placing orders due to sanctions.');
                }
            }
        } else {
            $subtotal = 0;
            foreach ($data['products'] as $product) {
                $subtotal += $product['pivot']['quantity'] * $product['price'];
            }
            $data['subtotal'] = $subtotal;
            $data['total'] = $subtotal;
            $order = $this->repository->create($data);
            if ($order) {
                $this->cartService->emptyCart($data['user_id']);
            }
            return $order;
        }
    }
    public function getByUserId($userId)
    {
        return $this->repository->getByUserId($userId);
    }
}
