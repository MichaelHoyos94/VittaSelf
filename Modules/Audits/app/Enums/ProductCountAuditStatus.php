<?php

namespace Modules\Audits\Enums;

enum ProductCountAuditStatus : string
{
    case CORRECT = "correct";
    case CORRECT_WITH_ISSUES = "correct_with issues";
    case INCORRECT = "isncorrect";
}
