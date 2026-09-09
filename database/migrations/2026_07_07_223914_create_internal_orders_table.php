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
        Schema::create('internal_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->nullable()->unique();
            $table->decimal('subtotal', 13, 2);
            $table->decimal('total', 13, 2);
            $table->enum('status', ['pending', 'paid', 'sended', 'delivered'])->default('pending');
            $table->enum('payment_method', ['cash', 'bank transfer']);
            $table->string('shipping_address');
            $table->string('phone', 10);
            $table->string('email');
            $table->decimal('discount', 13, 2);
            $table->decimal('points', 10, 2);
            $table->foreignId('user_id')->constrained('users')->restrictOnDelete();
            $table->foreignId('commercial_agent_id')->constrained('users')->restrictOnDelete();
            $table->foreignId('cost_center_id')->constrained('cost_centers')->restrictOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internal_orders');
    }
};
