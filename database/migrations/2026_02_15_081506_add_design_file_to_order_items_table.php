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
        Schema::table('order_items', function (Blueprint $table) {
            // Kolom untuk menyimpan path gambar (bisa null jika beli polos)
            $table->string('design_file')->nullable()->after('quantity');

            // Kolom catatan tambahan untuk desain (opsional)
            $table->text('design_note')->nullable()->after('design_file');
        });
    }

    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropColumn(['design_file', 'design_note']);
        });
    }
};
