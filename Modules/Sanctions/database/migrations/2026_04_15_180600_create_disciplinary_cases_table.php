<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('disciplinary_cases', function (Blueprint $table) {
            $table->id();
            $table->string('facts_description', 255);
            $table->string('details', 64)->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('admin_id')->constrained('users');
            $table->foreignId('policy_id')->constrained('cat_policies');
            $table->foreignId('compliance_source_id')->constrained('cat_compliance_sources');
            $table->foreignId('case_status_id')->constrained('cat_case_statuses');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('disciplinary_cases');
    }
};
