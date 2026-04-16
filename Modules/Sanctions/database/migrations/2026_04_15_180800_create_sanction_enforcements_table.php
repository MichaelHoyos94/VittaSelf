<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sanction_enforcements', function (Blueprint $table) {
            $table->id();
            $table->boolean('suspend_account')->default(false);
            $table->boolean('suspend_benefits')->default(false);
            $table->boolean('freeze_earnings')->default(false);
            $table->boolean('block_qualification')->default(false);
            $table->boolean('suspend_code')->default(false);
            $table->dateTime('applied_at');
            $table->dateTime('lifted_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreignId('resolution_id')->constrained('resolution');
            $table->foreignId('user_id')->constrained('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sanction_enforcements');
    }
};
