<?php

namespace App\Exceptions;

class DisciplinaryCaseAlreadyFinalException extends BusinessException
{
    public function __construct()
    {
        parent::__construct('The disciplinary case is already final.');
    }
}
