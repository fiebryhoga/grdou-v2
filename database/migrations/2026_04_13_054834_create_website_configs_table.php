<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('website_configs', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            
            // 4 Kolom Keunggulan (Judul & Deskripsi)
            $table->string('keunggulan_1_title')->nullable();
            $table->text('keunggulan_1_desc')->nullable();
            
            $table->string('keunggulan_2_title')->nullable();
            $table->text('keunggulan_2_desc')->nullable();
            
            $table->string('keunggulan_3_title')->nullable();
            $table->text('keunggulan_3_desc')->nullable();
            
            $table->string('keunggulan_4_title')->nullable();
            $table->text('keunggulan_4_desc')->nullable();
            
            // Kolom untuk 3 gambar client
            $table->string('client_image_1')->nullable();
            $table->string('client_image_2')->nullable();
            $table->string('client_image_3')->nullable();
            
            // Informasi Kontak & Sosmed
            $table->string('whatsapp')->nullable();
            $table->string('email')->nullable();
            $table->text('address')->nullable();
            $table->string('youtube')->nullable();
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('website_configs');
    }
};