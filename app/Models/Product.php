<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'description', 'thumbnail', 'images', 
        'base_price', 'discount_price', 'specifications', 
        'addons', 'available_sizes', 'is_active'
    ];
    
    protected $casts = [
        'images' => 'array',
        'specifications' => 'array',
        'addons' => 'array', // Ini penting!
        'available_sizes' => 'array',
    ];
}
