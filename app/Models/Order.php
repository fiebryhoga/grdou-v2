<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Order extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id', 'order_number', 'total_price', 'status', 'snap_token',
        'customer_name', 'customer_email', 'customer_phone',
        'shipping_address', 'shipping_courier', 'shipping_service', 'shipping_cost'
    ];

    // Relasi ke Item
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Helper untuk Warna Label Status di Frontend Admin
    public function getStatusColorAttribute()
    {
        // PERBAIKAN: Menggunakan Array Mapping agar kompatibel semua versi PHP
        $colors = [
            'pending'    => 'bg-gray-100 text-gray-800',
            'paid'       => 'bg-blue-100 text-blue-800',
            
            // Kuning
            'processing' => 'bg-yellow-100 text-yellow-800',
            'finishing'  => 'bg-yellow-100 text-yellow-800',
            
            // Ungu
            'packaging'  => 'bg-purple-100 text-purple-800',
            'ready'      => 'bg-purple-100 text-purple-800',
            'shipped'    => 'bg-purple-100 text-purple-800',
            
            // Hijau
            'completed'  => 'bg-green-100 text-green-800',
            
            // Merah
            'cancel'     => 'bg-red-100 text-red-800',
            'expire'     => 'bg-red-100 text-red-800',
        ];

        // Ambil warna berdasarkan status, jika tidak ada pakai default (gray)
        return $colors[$this->status] ?? 'bg-gray-100 text-gray-800';
    }
}