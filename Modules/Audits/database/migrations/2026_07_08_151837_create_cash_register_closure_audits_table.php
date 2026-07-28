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
        Schema::create('cash_register_closure_audits', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['approved', 'rejected']);
            $table->decimal('expected_cash');
            $table->decimal('counted_cash', 13, 2);
            $table->decimal('expected_bank_transfer', 13, 2);
            $table->decimal('counted_bank_transfer', 13, 2);
            $table->string('observations', 255)->nullable();
            $table->text('report');
            $table->string('pdf_path')->nullable();
            $table->foreignId('cash_register_closure_id')->constrained('cash_register_closures')->restrictOnDelete();
            $table->foreignId('audited_by')->constrained('users')->restrictOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cash_register_closure_audits');
    }
};
