<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('resolution_mitigations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resolution_id')->constrained('resolution');
            $table->foreignId('cat_mitigation_id')->constrained('cat_mitigations');
            $table->unique(['resolution_id', 'cat_mitigation_id'], 'resolution_mitigations_index_0');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resolution_mitigations');
    }
};
