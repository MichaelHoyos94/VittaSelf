<?php

namespace App\Enums;

enum RoleName: string
{
    case SUPER_ADMIN = 'super-admin';
    case ADMINISTRATOR = 'administrator';
    case EUI = 'eui';
    case COMMERCIAL_AGENT = 'commercial-agent';
}