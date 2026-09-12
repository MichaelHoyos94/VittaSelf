<?php

namespace App\Exceptions;

class ProductNotInCartException extends BusinessException
{
    public function __construct()
    {
        parent::__construct('The product is not in the cart.');
    }
}
