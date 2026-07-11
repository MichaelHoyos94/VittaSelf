<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\ProductCountAudit;

class ProductCountAuditRepository{
    public function __construct() {}
    public function getAll(){
        return ProductCountAudit::with(["auditor"])->get();
    }
    public function create($data){
        return ProductCountAudit::create($data);
    }
    public function getById($id){
        return ProductCountAudit::findOrFail($id);
    }
}