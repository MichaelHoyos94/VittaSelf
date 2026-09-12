<?php

namespace App\Exceptions;

class PendingCashRegisterClosureAuditException extends BusinessException
{
    public function __construct()
    {
        parent::__construct(
            'There is a pending audit for the previous cash register closure.',
        );
    }
}
