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
        Schema::create('cash_register_closures', function (Blueprint $table) {
            $table->id();
            $table->integer('bills_100000')->default(0);
            $table->integer('bills_50000')->default(0);
            $table->integer('bills_20000')->default(0);
            $table->integer('bills_10000')->default(0);
            $table->integer('bills_5000')->default(0);
            $table->integer('bills_2000')->default(0);
            $table->integer('coins_1000')->default(0);
            $table->integer('coins_500')->default(0);
            $table->integer('coins_200')->default(0);
            $table->integer('coins_100')->default(0);
            $table->integer('coins_50')->default(0);
            $table->decimal('bank_transfer', 13, 2);
            $table->date('date');
            $table->foreignId('cash_register_id')->constrained('cash_registers')->nullOnDelete();
            $table->foreignId('commercial_agent_id')->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cash_register_closures');
    }
};
