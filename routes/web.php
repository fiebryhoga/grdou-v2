<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ManageAdminController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Customer\HomeController;
use App\Http\Controllers\Customer\OrderController;
use App\Http\Controllers\Customer\CatalogController;
use App\Http\Controllers\Admin\WebsiteConfigController;
use App\Http\Controllers\Admin\AboutConfigController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/tentang-kami', [HomeController::class, 'about'])->name('tentang.index'); // <-- Menggunakan HomeController

// Katalog
Route::get('/katalog', [CatalogController::class, 'index'])->name('katalog.index');
Route::get('/katalog/{id}', [CatalogController::class, 'show'])->name('katalog.show');
Route::redirect('/produk', '/katalog');

// Keranjang
Route::get('/keranjang', function () {
    return Inertia::render('Customer/Cart');
})->name('cart.index');

// Checkout
Route::get('/checkout', function () {
    return Inertia::render('Customer/Checkout');
})->name('checkout.form');
Route::post('/checkout', [OrderController::class, 'checkout'])->name('checkout.process');

// Order Tambahan
Route::get('/order/create', function () { return Inertia::render('Customer/Checkout'); })->name('order.create');
Route::get('/order/track', function () { return Inertia::render('Customer/Track'); })->name('order.track');
Route::get('/order/{order}', [OrderController::class, 'show'])->name('order.show');

// Galeri
Route::get('/galeri', function () { return Inertia::render('Customer/Gallery'); })->name('galeri.index');

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::resource('manage-admin', ManageAdminController::class)
        ->names('admin.manage')
        ->except(['create', 'show', 'edit']);

    Route::prefix('admin/product')->name('admin.product.')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('index');
        Route::get('/create', [ProductController::class, 'create'])->name('create');
        Route::post('/', [ProductController::class, 'store'])->name('store');
        Route::get('/{product}', [ProductController::class, 'show'])->name('show');
        Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('edit');
        Route::put('/{product}', [ProductController::class, 'update'])->name('update');
        Route::delete('/{product}', [ProductController::class, 'destroy'])->name('destroy');
    });

    // Konfigurasi Website Utama
    Route::get('/konfigurasi', [WebsiteConfigController::class, 'edit'])->name('admin.config.edit');
    Route::put('/konfigurasi', [WebsiteConfigController::class, 'update'])->name('admin.config.update');

    // Konfigurasi Halaman About
    Route::get('/konfigurasi-about', [AboutConfigController::class, 'edit'])->name('admin.about_config.edit');
    Route::put('/konfigurasi-about', [AboutConfigController::class, 'update'])->name('admin.about_config.update');

    // Pesanan (Orders)
    Route::get('/orders', [App\Http\Controllers\Admin\OrderController::class, 'index'])->name('admin.orders.index');
    Route::get('/orders/{id}', [App\Http\Controllers\Admin\OrderController::class, 'show'])->name('admin.orders.show');
    Route::patch('/orders/{id}/status', [App\Http\Controllers\Admin\OrderController::class, 'updateStatus'])->name('admin.orders.update-status');
});

/*
|--------------------------------------------------------------------------
| PROFILE ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';