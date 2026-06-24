<?php

namespace Modules\Audits\Repositories;

use Modules\Audits\Models\ProductCountAudit;

class ProductCountAuditRepository{
    public function __construct() {}
    public function getAll(){
        return ProductCountAudit::all();
    }
    public function create($data){
        return ProductCountAudit::create($data);
    }
    public function getById($id){
        return ProductCountAudit::findOrFail($id);
    }
}