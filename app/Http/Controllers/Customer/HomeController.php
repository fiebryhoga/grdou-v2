<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\AboutConfig;
use App\Models\Testimonial;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $produks = Product::latest()->take(6)->get();
        
        $testimonials = Testimonial::latest()->get();

        return Inertia::render('Customer/Home', [
            'produks' => $produks,
            'testimonials' => $testimonials,
        ]);
    }

    public function about()
    {
        return Inertia::render('Customer/About', [
            // INI KUNCI UTAMANYA: Mengirim data ke React
            'about_config' => AboutConfig::first()
        ]);
    }
}