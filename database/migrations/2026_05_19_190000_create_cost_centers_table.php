<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cost_centers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 64);
            $table->string('address', 255);
            $table->string('contact_email', 64)->nullable();
            $table->string('phone', 10)->nullable();
            $table->string('photo', 64)->default('cost_center.png');
            $table->timestamps();
            $table->softDeletes();
            $table->foreignId('user_id')->constrained('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cost_centers');
    }
};
