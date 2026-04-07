<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index(Request $request)
    {
        // Mengambil SEMUA produk yang aktif dari database
        $produks = Product::where('is_active', true)
            ->latest()
            ->get();

        return Inertia::render('Customer/Catalog/Index', [
            // Mengirim data ke props 'produks' di React
            'produks' => $produks 
        ]);
    }

    public function show($id)
    {
        // Mengambil detail 1 produk
        $product = Product::where('is_active', true)->findOrFail($id);

        return Inertia::render('Customer/Catalog/Show', [
            'product' => $product
        ]);
    }
}