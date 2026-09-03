<?php

namespace App\Services;

use App\Repositories\OrderRepository;

class OrderService
{
    public function __construct(
        private OrderRepository $repository,
        private CartService $cartService,
        private OrderProcessingService $orderProcessingService,
    ) {}

    public function getAll($search)
    {
        return $this->repository->getAll($search);
    }

    public function create($data, $user)
    {
        $restrictions = $this->orderProcessingService->checkRestrictions($data['user_id']);
        $products = $this->normalizeProducts($data['products']);
        $data = $this->orderProcessingService->prepareOrderData($data, $products, $restrictions);
        $data = $this->orderProcessingService->applyUserPlanBenefits($data, $restrictions);
        $order = $this->repository->create($data);

        if ($order) {
            $this->cartService->emptyCart($data['user_id']);
            $this->orderProcessingService->applyOrderPoints($data, $restrictions);
        }

        return $order;
    }

    public function getByUserId($userId)
    {
        return $this->repository->getByUserId($userId);
    }

    private function normalizeProducts(array $products): array
    {
        return array_map(fn ($product) => [
            'quantity' => $product['pivot']['quantity'],
            'price' => $product['price'],
            'points' => $product['points'],
        ], $products);
    }
}
