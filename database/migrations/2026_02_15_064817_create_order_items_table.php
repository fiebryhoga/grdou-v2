<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // PERHATIKAN BAGIAN INI: Harusnya 'order_items', bukan 'orders'
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            
            // Relasi ke tabel orders (UUID)
            $table->foreignUuid('order_id')->constrained('orders')->cascadeOnDelete();
            
            $table->foreignId('product_id')->constrained('products'); 
            
            $table->string('product_name'); 
            $table->decimal('price', 12, 2); 
            $table->integer('quantity');
            $table->json('variants')->nullable(); 
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // Pastikan ini drop 'order_items' juga
        Schema::dropIfExists('order_items');
    }
};