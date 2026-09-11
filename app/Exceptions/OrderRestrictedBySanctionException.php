<?php

namespace App\Exceptions;

class OrderRestrictedBySanctionException extends BusinessException
{
    public function __construct()
    {
        parent::__construct(
            'The order cannot be placed because the customer is subject to a sanction.',
        );
    }
}
