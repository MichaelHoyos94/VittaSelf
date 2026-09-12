<?php

namespace Modules\Audits\Exceptions;

use App\Exceptions\BusinessException;

class QualityChecklistAlreadyExistsException extends BusinessException
{
    public function __construct()
    {
        parent::__construct('There is already an open quality checklist for this date and this cost center.');
    }
}
