<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('code', 64)->unique();
            $table->string('name', 64)->unique();
            $table->string('logo')->default('logo.png');
            $table->string('description', 255)->nullable();
            $table->decimal('min_points', 10, 2);
            $table->foreignId('next_plan_id')->nullable()->constrained('plans')->nullOnDelete();
            $table->foreignId('previous_plan_id')->nullable()->constrained('plans')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
