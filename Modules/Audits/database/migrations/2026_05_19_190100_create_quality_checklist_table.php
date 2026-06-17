<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quality_checklist', function (Blueprint $table) {
            $table->id();
            $table->float('temperature_start');
            $table->float('temperature_end');
            $table->boolean('smoke_detector');
            $table->dateTime('extingisher_expiration_date');
            $table->dateTime('last_plague_control');
            $table->dateTime('last_bathroom_sanitation');
            $table->float('humidity_percentage');
            $table->text('observations')->nullable();
            $table->date('checklist_date');
            $table->timestamps();
            $table->foreignId('cost_center_id')->constrained('cost_centers');
            $table->unique(['cost_center_id', 'checklist_date'], 'quality_checklist_index_0');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quality_checklist');
    }
};
