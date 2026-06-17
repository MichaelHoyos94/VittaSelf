<?php

namespace Modules\Audits\Enums;

enum ProductCountAuditStatus : string
{
    case CORRECT = "Correct";
    case CORRECT_WITH_ISSUES = "Correct with issues";
    case INCORRECT = "Incorrect";
}
