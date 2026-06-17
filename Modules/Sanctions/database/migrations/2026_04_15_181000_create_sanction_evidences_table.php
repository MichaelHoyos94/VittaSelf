<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sanction_evidences', function (Blueprint $table) {
            $table->id();
            $table->string('file', 128);
            $table->string('description', 128);
            $table->timestamps();
            $table->softDeletes();
            $table->foreignId('disciplinary_case_id')->constrained('disciplinary_cases');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sanction_evidences');
    }
};
