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
            $table->enum('status', ['aproved', 'rejected']);
            $table->decimal('expected_cash', 13, 2);
            $table->decimal('expected_bank_transfer', 13, 2);
            $table->decimal('counted_cash');
            $table->decimal('counted_bank_transfer');
            $table->string('observations')->nullable();
            $table->text('report');
            $table->string('pdf_path');
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
