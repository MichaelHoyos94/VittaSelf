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
        Schema::create('product_count_audits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_count_id')->constrained('product_counts')->onDelete('cascade');
            $table->enum('status', ['correct', 'correct with issues', 'incorrect']);
            $table->foreignId('audited_by')->constrained('users')->onDelete('cascade');
            $table->dateTime('audited_at');
            $table->integer('total_expected_products');
            $table->integer('total_counted_products');
            $table->integer('total_difference');
            $table->integer('products_with_mismatch');
            $table->integer('products_with_observations');
            $table->boolean('requires_recount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_count_audits');
    }
};
