<?php

namespace App\Enums;

enum Category : string
{
    case SUPPLEMENTS = 'Supplements';
    case PET_CARE = 'Pet care';
    case FOOD_BEVERAGE = 'Powder';
    case PHARMACY = 'Tablets';
    case PERSONAL_CARE = 'Personal care';
    case BEAUTY = 'Beauty';
    case HEALTH_CARE = 'Health care';
    case MERCHANDISING = 'Merchandising';
}
