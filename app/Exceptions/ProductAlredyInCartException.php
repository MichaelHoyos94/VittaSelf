<?php

namespace App\Exceptions;

class ProductAlredyInCartException extends BusinessException
{
    public function __construct()
    {
        parent::__construct('The product is already in the cart.');
    }
}
