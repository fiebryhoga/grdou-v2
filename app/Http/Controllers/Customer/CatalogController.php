<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    // Halaman List Produk
    public function index()
    {
        $products = Product::where('is_active', true)
            ->latest()
            ->paginate(12); // Tampilkan 12 produk per halaman

        return Inertia::render('Customer/Catalog/Index', [
            'products' => $products
        ]);
    }

    // Halaman Detail Produk
    public function show($id)
    {
        $product = Product::where('id', $id)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Customer/Catalog/Show', [
            'product' => $product
        ]);
    }
}