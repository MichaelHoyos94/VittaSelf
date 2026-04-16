<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Modules\Sanctions\Enums\ResolutionType;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('resolution', function (Blueprint $table) {
            $table->id();
            $table->enum('resolution_type', array_column(ResolutionType::cases(), 'value'));
            $table->string('resolution_text', 255);
            $table->timestamps();
            $table->softDeletes();
            $table->foreignId('disciplinary_case_id')->unique()->constrained('disciplinary_cases');
            $table->foreignId('sanction_level_id')->constrained('cat_sanctions_level');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resolution');
    }
};
