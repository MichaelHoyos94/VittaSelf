<?php

namespace Modules\Audits\Enums;

enum CashRegisterClosureAuditStatus: string
{
    case APPROVED = "approved";
    case REJECTED = "rejected";
}
