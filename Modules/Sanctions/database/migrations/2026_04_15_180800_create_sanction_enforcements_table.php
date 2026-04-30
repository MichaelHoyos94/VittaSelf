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
            $table->boolean('SUSPEND_ACCOUNT')->default(false);
            $table->boolean('FREEZE_PLAN')->default(false);
            $table->boolean('FREEZE_BONUSES')->default(false);
            $table->boolean('FREEZE_POINTS')->default(false);
            $table->boolean('SUSPEND_CODE')->default(false);
            $table->boolean('DOWNGRADE_PLAN')->default(false);
            $table->boolean('TERMINATE_ACCOUNT')->default(false);
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
