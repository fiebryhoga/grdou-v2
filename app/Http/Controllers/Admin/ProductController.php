<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Menampilkan daftar produk dengan Pagination & Search.
     */
    public function index(Request $request)
    {
        $query = Product::query();

        // Fitur Pencarian
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        return Inertia::render('Admin/Product/Index', [
            'products' => $query->latest()->paginate(10)->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Menampilkan form create.
     */
    public function create()
    {
        return Inertia::render('Admin/Product/Create');
    }

    /**
     * Menyimpan produk baru ke database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required',
            'base_price' => 'required|numeric',
            'thumbnail' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            // Validasi array gambar galeri
            'images.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', 
        ]);

        // 1. Simpan Thumbnail Utama
        $thumbnailPath = $request->file('thumbnail')->store('products/thumbnails', 'public');

        // 2. Simpan Galeri Gambar (Multiple)
        $galleryPaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                // Simpan ke storage/app/public/products/gallery
                $path = $file->store('products/gallery', 'public');
                // Simpan path publiknya
                $galleryPaths[] = '/storage/' . $path;
            }
        }

        // 3. Create Data
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'base_price' => $request->base_price,
            'discount_price' => $request->discount_price,
            'thumbnail' => '/storage/' . $thumbnailPath,
            'images' => $galleryPaths, // Array path galeri
            'specifications' => $request->specifications ?? [],
            'addons' => $request->addons ?? [],
            'available_sizes' => $request->available_sizes ?? [],
            'is_active' => true
        ]);

        // 4. Catat Log Aktivitas (Opsional)
        if (class_exists(Activity::class)) {
            Activity::create([
                'user_id' => auth()->id(),
                'user_name' => auth()->user()->name,
                'message' => "Created new product: {$product->name}",
                'type' => 'create',
                'path' => route('admin.product.show', $product->id)
            ]);
        }

        return redirect()->route('admin.product.index')->with('message', 'Produk berhasil diterbitkan!');
    }

    /**
     * Menampilkan detail produk.
     */
    public function show(Product $product)
    {
        return Inertia::render('Admin/Product/Show', [
            'product' => $product
        ]);
    }

    /**
     * Menampilkan form edit.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Admin/Product/Edit', [
            'product' => $product
        ]);
    }

    /**
     * Memperbarui data produk.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required',
            'base_price' => 'required|numeric',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'images.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Ambil data text dasar
        $data = $request->only([
            'name', 'description', 'base_price', 'discount_price', 
            'specifications', 'addons', 'available_sizes', 'is_active'
        ]);

        // 1. Handle Update Thumbnail (Ganti jika ada upload baru)
        if ($request->hasFile('thumbnail')) {
            // Hapus thumbnail lama
            if ($product->thumbnail) {
                $oldPath = str_replace('/storage/', '', $product->thumbnail);
                if(Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
            // Simpan thumbnail baru
            $newPath = $request->file('thumbnail')->store('products/thumbnails', 'public');
            $data['thumbnail'] = '/storage/' . $newPath;
        }

        // 2. Handle Update Galeri Gambar (Complex Logic)
        
        // A. Ambil gambar yang sudah ada di database
        $currentImages = $product->images ?? [];

        // B. Hapus gambar lama yang diminta user (dikirim via array deleted_images)
        if ($request->has('deleted_images')) {
            $deletedImages = $request->deleted_images; // Array URL
            
            foreach ($deletedImages as $delUrl) {
                // Hapus file fisik di storage
                $path = str_replace('/storage/', '', $delUrl);
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }

                // Hapus entry dari array PHP
                $key = array_search($delUrl, $currentImages);
                if ($key !== false) {
                    unset($currentImages[$key]);
                }
            }
            // Re-index array supaya urutannya rapi (0, 1, 2...) penting untuk JSON
            $currentImages = array_values($currentImages);
        }

        // C. Tambah gambar baru (Upload)
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('products/gallery', 'public');
                $currentImages[] = '/storage/' . $path; // Push ke array
            }
        }

        // D. Masukkan array final ke data update
        $data['images'] = $currentImages;

        // 3. Update Database
        $product->update($data);

        // 4. Catat Log
        if (class_exists(Activity::class)) {
            Activity::create([
                'user_id' => auth()->id(),
                'user_name' => auth()->user()->name,
                'message' => "Updated product details: {$product->name}",
                'type' => 'edit',
                'path' => route('admin.product.show', $product->id)
            ]);
        }

        return redirect()->route('admin.product.index')->with('message', 'Produk berhasil diperbarui!');
    }

    /**
     * Menghapus produk dan filenya.
     */
    public function destroy(Product $product)
    {
        $name = $product->name;
        
        // 1. Hapus File Thumbnail
        if ($product->thumbnail) {
            $path = str_replace('/storage/', '', $product->thumbnail);
            if(Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        }

        // 2. Hapus Semua File Galeri
        if ($product->images && is_array($product->images)) {
            foreach ($product->images as $imgUrl) {
                $path = str_replace('/storage/', '', $imgUrl);
                if(Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }
        }

        // 3. Hapus Record Database
        $product->delete();

        // 4. Catat Log
        if (class_exists(Activity::class)) {
            Activity::create([
                'user_id' => auth()->id(),
                'user_name' => auth()->user()->name,
                'message' => "Deleted product: {$name}",
                'type' => 'delete',
                'path' => null
            ]);
        }

        return redirect()->back()->with('message', 'Produk dihapus permanen.');
    }
}