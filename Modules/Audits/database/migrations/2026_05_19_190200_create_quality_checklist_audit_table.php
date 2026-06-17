<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quality_checklist_audit', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['excellent', 'good', 'bad', 'critical']);
            $table->boolean('requires_actions');
            $table->text('corrective_actions')->nullable();
            $table->timestamps();
            $table->foreignId('quality_checklist_id')->constrained('quality_checklist');
            $table->foreignId('audited_by')->constrained('users');
            $table->unique('quality_checklist_id', 'quality_checklist_audit_index_0');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quality_checklist_audit');
    }
};
