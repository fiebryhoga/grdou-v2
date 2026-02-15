<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('thumbnail');
            $table->json('images')->nullable();
            $table->decimal('base_price', 12, 2);
            $table->decimal('discount_price', 12, 2)->nullable();
            $table->json('specifications')->nullable(); 
            
            // TAMBAHKAN KOLOM INI:
            $table->json('addons')->nullable(); 
            
            $table->json('available_sizes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
