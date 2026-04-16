<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cat_case_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('code', 64)->unique();
            $table->string('case_status', 64)->unique();
            $table->string('case_status_description', 128);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cat_case_statuses');
    }
};
