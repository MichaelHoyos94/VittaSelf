<?php

namespace App\Enums;

enum Presentation : string
{
    case CAPSULES = 'Capsules';
    case LIQUID = 'Liquid';
    case POWDER = 'Powder';
    case TABLETS = 'Tablets';
    case OTHERS = 'Others';
}
