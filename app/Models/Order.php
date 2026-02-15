<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; // Import UUID

class Order extends Model
{
    use HasUuids; // Aktifkan UUID

    protected $fillable = [
        'user_id', 'order_number', 'total_price', 'status', 'snap_token',
        'customer_name', 'customer_email', 'customer_phone', 'shipping_address'
    ];

    // Relasi ke Item
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Relasi ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}