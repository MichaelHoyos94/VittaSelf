<?php

namespace App\Enums;

enum Role: string
{
    case ROOT = 'root';
    case COMMERCIAL_AGENT = 'commercial_agent';
    case ADMIN = 'admin';
    case CUSTOMER = 'customer';
}
