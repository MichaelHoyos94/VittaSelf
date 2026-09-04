<?php

namespace App\Enums;

enum OrderStatus: string
{
    case PENDING = 'pending';
    case PAID = 'paid';
    case SENDED = 'sended';
    case DELIVERED = 'delivered';
}
