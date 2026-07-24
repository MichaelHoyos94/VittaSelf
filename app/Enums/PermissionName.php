<?php

namespace App\Enums;

enum PermissionName: string
{
    // eui
    case EUI_VIEW = 'eui.view';
    case EUI_CREATE = 'eui.create';
    case EUI_UPDATE = 'eui.update';
    case EUI_DELETE = 'eui.delete';

        // employees
    case EMPLOYEES_VIEW = 'employees.view';
    case EMPLOYEES_CREATE = 'employees.create';
    case EMPLOYEES_UPDATE = 'employees.update';
    case EMPLOYEES_DELETE = 'employees.delete';

        // Roles
    case ROLES_VIEW = 'roles.view';
    case ROLES_CREATE = 'roles.create';
    case ROLES_UPDATE = 'roles.update';
    case ROLES_DELETE = 'roles.delete';
    case ROLES_ASSIGN = 'roles.assign';

        // Auditorías
    case AUDITS_VIEW = 'audits.view';
    case AUDITS_CREATE = 'audits.create';
    case AUDITS_UPDATE = 'audits.update';
    case AUDITS_DELETE = 'audits.delete';
    case AUDITS_ASSIGN = 'audits.assign';
    case AUDITS_COMPLETE = 'audits.complete';

    case PRODUCT_COUNTS_EXECUTE = 'product-counts.execute';
    case CASH_COUNTS_EXECUTE = 'cash-counts.execute';
    case QUALITY_CHECKLISTS_EXECUTE = 'quality-checklists.execute';

        // Sanciones
    case SANCTIONS_VIEW = 'sanctions.view';
    case SANCTIONS_CREATE = 'sanctions.create';
    case SANCTIONS_UPDATE = 'sanctions.update';
    case SANCTIONS_ASSIGN = 'sanctions.assign';
    case SANCTIONS_CLOSE = 'sanctions.close';
    case SANCTIONS_DELETE = 'sanctions.delete';

        // Internal orders
    case INTERNAL_ORDERS_VIEW = 'internal-orders.view';
    case INTERNAL_ORDERS_CREATE = 'internal-orders.create';

        // Web orders
    case ORDERS_VIEW = 'orders.view';
    case ORDERS_CREATE = 'orders.create';

    // My orders
    case MY_ORDERS_VIEW = 'my-orders.view';

        // Products
    case PRODUCTS_CATALOG_VIEW = 'products-catalog.view';
    case PRODUCTS_MANAGE_VIEW = 'products-manage.view';
    case PRODUCTS_MANAGE_CREATE = 'products-manage.create';

    // Cash registers
    case CASH_REGISTERS_VIEW = 'cash-registers.view';
    case MY_CASH_REGISTER_VIEW = 'my-cash-register.view';
}
