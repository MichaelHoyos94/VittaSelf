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
        Schema::table('product_count_audits', function (Blueprint $table) {
            $table->longText('report')->nullable()->comment('Detailed report of the audit findings');
            $table->string('pdf_path')->nullable()->after('report');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_count_audits', function (Blueprint $table) {
            $table->dropColumn('report');
            $table->dropColumn('pdf_path');
        });
    }
};
