<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MidtransCallbackController;

// Route untuk Midtrans (Otomatis ada prefix '/api')
Route::post('/midtrans-callback', [MidtransCallbackController::class, 'handle']);

// Route default user (bawaan)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');