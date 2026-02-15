<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ManageAdminController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Customer\HomeController;
use App\Http\Controllers\Customer\OrderController;
use App\Http\Controllers\Customer\CatalogController;
use App\Http\Controllers\Api\OngkirController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES (CUSTOMER / GUEST)
|--------------------------------------------------------------------------
| Area ini untuk customer, tidak perlu login.
*/

// 1. Home & Landing
Route::get('/', [HomeController::class, 'index'])->name('home');

// 2. Katalog & Produk
Route::get('/katalog', [CatalogController::class, 'index'])->name('katalog.index');
Route::get('/katalog/{id}', [CatalogController::class, 'show'])->name('katalog.show');

// Redirect /produk ke /katalog agar konsisten
Route::redirect('/produk', '/katalog'); 

// 3. Keranjang & Transaksi
Route::get('/keranjang', function () {
    return Inertia::render('Customer/Cart');
})->name('cart.index');

Route::get('/checkout', function () {
    return Inertia::render('Customer/Checkout');
})->name('checkout.form');

// Alias untuk menu navbar (Buat Orderan)
Route::get('/order/create', function () {
    return Inertia::render('Customer/Checkout');
})->name('order.create'); 

// Proses Checkout (POST)
Route::post('/checkout', [OrderController::class, 'checkout'])->name('checkout.process');

// Halaman Invoice / Midtrans Payment
Route::get('/order/{order}', [OrderController::class, 'show'])->name('order.show');

// Placeholder Tracking
Route::get('/order/track', function () {
    return Inertia::render('Customer/Track'); 
})->name('order.track');

// 4. Halaman Informasi
Route::get('/tentang-kami', function () {
    return Inertia::render('Customer/About'); 
})->name('tentang.index');

Route::get('/galeri', function () {
    return Inertia::render('Customer/Gallery'); 
})->name('galeri.index');
















Route::prefix('api/ongkir')->group(function () {
    Route::get('/provinces', [OngkirController::class, 'getProvinces']);
    Route::get('/cities/{id}', [OngkirController::class, 'getCities']);
    Route::post('/check', [OngkirController::class, 'checkOngkir']);
});


/*
|--------------------------------------------------------------------------
| ADMIN ROUTES (AUTHENTICATED)
|--------------------------------------------------------------------------
| Area khusus Admin.
*/

Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard
    Route::get('/admin', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    // Manage Admins
    Route::resource('manage-admin', ManageAdminController::class)
        ->names('admin.manage')
        ->except(['create', 'show', 'edit']); 
        // Note: resource route otomatis bikin index, store, update, destroy

    // Manage Products
    Route::prefix('admin/product')->name('admin.product.')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('index');
        Route::get('/create', [ProductController::class, 'create'])->name('create');
        Route::post('/', [ProductController::class, 'store'])->name('store');
        Route::get('/{product}', [ProductController::class, 'show'])->name('show');
        Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('edit');
        Route::put('/{product}', [ProductController::class, 'update'])->name('update');
        Route::delete('/{product}', [ProductController::class, 'destroy'])->name('destroy');
    });

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