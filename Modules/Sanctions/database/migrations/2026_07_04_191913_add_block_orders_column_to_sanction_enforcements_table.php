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
        Schema::table('sanction_enforcements', function (Blueprint $table) {
            $table->boolean('BLOCK_ORDERS')->default(false)->after('TERMINATE_ACCOUNT');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sanction_enforcements', function (Blueprint $table) {
            $table->dropColumn('BLOCK_ORDERS');
        });
    }
};
