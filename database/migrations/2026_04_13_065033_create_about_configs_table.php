<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_configs', function (Blueprint $table) {
            $table->id();
            // Bagian Hero
            $table->string('hero_title')->nullable();
            $table->text('hero_subtitle')->nullable();
            
            // Bagian Cerita & Visi
            $table->string('story_title')->nullable();
            $table->text('story_text')->nullable();
            $table->string('vision_text')->nullable();
            $table->string('workshop_image')->nullable();
            
            // Bagian Statistik
            $table->string('stat_years')->nullable();
            $table->string('stat_clients')->nullable();
            $table->string('stat_products')->nullable();
            $table->string('stat_satisfaction')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_configs');
    }
};