<?php

namespace App\Enums;

enum PermissionName: string
{

    // Dashboard
    case DASHBOARD_VIEW = 'dashboard.view';

        // Catalog
    case PRODUCTS_CATALOG_VIEW = 'products-catalog.view';

        // Sanciones
    case SANCTIONS_VIEW = 'sanctions.sanctions-view';
    case SANCTIONS_CREATE = 'sanctions.sanctions-create';
    case SANCTIONS_ASSIGN = 'sanctions.sanctions-assign';
    case RESOLUTIONS_VIEW = 'sanctions.resolutions-view';
    case RESOLUTIONS_CREATE = 'sanctions.resolutions-create';

        // Auditorías
    case AUDITS_VIEW = 'audits.audits-view';
    case AUDITS_CREATE = 'audits.audits-create';
    case AUDITS_DOWNLOAD = 'audits.audits-download';

    case PRODUCT_COUNTS_VIEW = 'audits.product-counts-view';
    case PRODUCT_COUNTS_EXECUTE = 'audits.product-counts-execute';
    case CASH_COUNTS_VIEW = 'audits.cash-counts-view';
    case CASH_COUNTS_EXECUTE = 'audits.cash-counts-execute';
    case QUALITY_CHECKLISTS_VIEW = 'audits.quality-checklists-view';
    case QUALITY_CHECKLISTS_EXECUTE = 'audits.quality-checklists-execute';

        // OPERATIONS
    case OPERATIONS_VIEW = 'operations.view';
        // OPERATIONS -> PRODUCTS
    case PRODUCTS_MANAGE_VIEW = 'operations.products-manage-view';
    case PRODUCTS_MANAGE_CREATE = 'operations.products-manage-create';
    case INVENTORY_ENTRY_VIEW = 'operations.inventory-entry-view';
    case INVENTORY_TRANSFER = 'operations.inventory-transfer-view';

        // Human resources
    case HUMAN_RESOURCES_VIEW = 'human-resources.view';
    case EMPLOYEES_VIEW = 'human-resources.employees-view';
    case EMPLOYEES_CREATE = 'human-resources.employees-create';
    case EMPLOYEES_UPDATE = 'human-resources.employees-update';
    case EMPLOYEES_DELETE = 'human-resources.employees-delete';
    case ROLES_VIEW = 'human-resources.roles-view';
    case ROLES_CREATE = 'human-resources.roles-create';
    case ROLES_UPDATE = 'human-resources.roles-update';
    case ROLES_DELETE = 'human-resources.roles-delete';
    case ROLES_ASSIGN = 'human-resources.roles-assign';

        // eui
    case EUI_VIEW = 'eui.view';
    case EUI_CREATE = 'eui.create';
    case EUI_UPDATE = 'eui.update';
    case EUI_DELETE = 'eui.delete';

        // Orders
    case ORDERS_VIEW = 'orders.view';
    case INTERNAL_ORDERS_VIEW = 'orders.internal-orders-view';
    case INTERNAL_ORDERS_CREATE = 'orders.internal-orders-create';
    case WEB_ORDERS_VIEW = 'orders.web-orders-view';
    case ORDERS_CREATE = 'orders.web-orders-create';

        // Cash registers
    case CASH_REGISTER_MANAGE = 'cash-register-manage.view';
    case CASH_REGISTERS_VIEW = 'cash-register-manage.cash-registers-view';

        // My cash register
    case MY_CASH_REGISTER_VIEW = 'my-cash-register.view';

        // EUI Views 
    case MY_REFERRALS = 'my-referrals.view';
    case MY_WALLET = 'my-wallet.view';
    case MY_ORDERS_VIEW = 'my-orders.view';
}
