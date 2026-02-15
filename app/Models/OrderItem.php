<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id', 'product_id', 'product_name', 'price', 'quantity', 'variants', 'design_file',
        'design_note'
    ];

    protected $casts = [
        'variants' => 'array', // Agar otomatis jadi JSON saat disimpan
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}