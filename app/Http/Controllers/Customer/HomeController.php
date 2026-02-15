<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Customer/Home', [
            'title' => 'Konveksi & Sablon Terbaik',
            // Nanti di sini bisa pass data produk unggulan, dll.
        ]);
    }
}