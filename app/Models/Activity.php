<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = ['user_id', 'user_name', 'message', 'type', 'path'];



    public static function log($message, $type = 'info', $path = null)
    {
        return self::create([
            'user_id' => auth()->id(),
            'user_name' => auth()->user()->name,
            'message' => $message,
            'type' => $type,
            'path' => $path
        ]);
    }
}
