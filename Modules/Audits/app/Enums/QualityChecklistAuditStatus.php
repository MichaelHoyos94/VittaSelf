<?php

namespace Modules\Audits\Enums;

enum Status: string
{
    case EXCELLENT = 'excellent';
    case GOOD = 'good';
    case BAD = 'bad';
    case CRITICAL = 'critical';
}
