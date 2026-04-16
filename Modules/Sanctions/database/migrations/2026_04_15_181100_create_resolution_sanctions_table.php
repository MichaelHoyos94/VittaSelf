<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('resolution_sanctions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cat_sanction_id')->constrained('cat_sanctions');
            $table->foreignId('resolution_id')->constrained('resolution');
            $table->unique(['cat_sanction_id', 'resolution_id'], 'resolution_sanctions_index_0');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resolution_sanctions');
    }
};
