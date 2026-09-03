<?php

namespace App\Services;

use App\Repositories\InternalOrderRepository;

class InternalOrderService
{
    public function __construct(
        private InternalOrderRepository $internalOrderRepository,
        private OrderProcessingService $orderProcessingService,
    ) {}

    public function getAll($search)
    {
        return $this->internalOrderRepository->getAll($search);
    }

    public function create($data)
    {
        $restrictions = $this->orderProcessingService->checkRestrictions($data['user_id']);
        $products = $this->normalizeProducts($data['products']);
        $data = $this->orderProcessingService->prepareOrderData($data, $products, $restrictions);
        $data = $this->orderProcessingService->applyUserPlanBenefits($data, $restrictions);
        $order = $this->internalOrderRepository->create($data);

        if ($order) {
            $this->orderProcessingService->applyOrderPoints($data, $restrictions);
        }

        return $order;
    }

    private function normalizeProducts(array $products): array
    {
        return array_map(fn ($product) => [
            'quantity' => $product['quantity'],
            'price' => $product['price'],
            'points' => $product['points'],
        ], $products);
    }
}
