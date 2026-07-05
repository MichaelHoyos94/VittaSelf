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
        Schema::create('benefits', function (Blueprint $table) {
            $table->id();
            $table->string('code', 64)->unique();
            $table->string('name', 64)->unique();
            $table->enum('type', ['discount', 'shipping_discount', 'points_multiplier', 'number_of_partners']);
            $table->string('description', 255)->nullable();
            $table->decimal('value', 10, 2)->nullable();
            $table->json('config')->nullable();
            $table->foreignId('plan_id')->constrained('plans')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['plan_id', 'code', 'type'], 'unique_plan_benefit');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('benefits');
    }
};
