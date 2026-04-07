<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary(); 
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();            
            $table->string('order_number')->unique(); // INV-XXXX
            $table->decimal('total_price', 15, 2);

            $table->enum('status', [
                'pending', 'paid', 'processing', 'finishing', 
                'packaging', 'ready', 'shipped', 'completed', 
                'cancel', 'expire'
            ])->default('pending');
            
            // Data Midtrans
            $table->string('snap_token')->nullable();
            
            // Data Pelanggan
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            
            // Data Pengiriman (PENTING: Tadi belum ada di migration Anda)
            $table->text('shipping_address');
            $table->string('shipping_courier')->nullable(); // JNE, POS, atau Pickup
            $table->string('shipping_service')->nullable(); // OKE, REG, atau Ambil Sendiri
            $table->decimal('shipping_cost', 12, 2)->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};