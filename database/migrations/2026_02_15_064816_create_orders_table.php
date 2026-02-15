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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Pakai UUID agar order ID susah ditebak
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();            
            $table->string('order_number')->unique(); // Contoh: INV-20240214-001
            $table->decimal('total_price', 12, 2);
            
            // Status Pembayaran: pending, paid, expire, cancel
            $table->enum('status', ['pending', 'paid', 'expire', 'cancel'])->default('pending');
            
            // Token dari Midtrans (PENTING untuk popup bayar)
            $table->string('snap_token')->nullable();
            
            // Info Customer (Simpan snapshot alamat saat beli)
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->text('shipping_address');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
