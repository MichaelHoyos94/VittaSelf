<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cat_policies', function (Blueprint $table) {
            $table->id();
            $table->string('policy', 128)->unique();
            $table->string('section', 64);
            $table->string('numeral', 64);
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cat_policies');
    }
};
