<?php

namespace Modules\Sanctions\Exceptions;

use Exception;

class UserSanctionedException extends Exception
{
    public function __construct(
        $message = "User is currently sanctioned and cannot perform this action.",
        $code = 403
    ) {
        parent::__construct($message, $code);
    }
}
