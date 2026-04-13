<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WebsiteConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WebsiteConfigController extends Controller
{
    public function edit()
    {
        // Ambil data pertama atau buat baru jika belum ada (fallback)
        $config = WebsiteConfig::firstOrCreate(['id' => 1]);
        
        return Inertia::render('Admin/WebsiteConfig/Edit', [
            'config' => $config
        ]);
    }

    public function update(Request $request)
    {
        // Gunakan firstOrCreate agar aman jika data kosong
        $config = WebsiteConfig::firstOrCreate(['id' => 1]);

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            
            // Validasi 4 Keunggulan
            'keunggulan_1_title' => 'nullable|string|max:255',
            'keunggulan_1_desc' => 'nullable|string',
            'keunggulan_2_title' => 'nullable|string|max:255',
            'keunggulan_2_desc' => 'nullable|string',
            'keunggulan_3_title' => 'nullable|string|max:255',
            'keunggulan_3_desc' => 'nullable|string',
            'keunggulan_4_title' => 'nullable|string|max:255',
            'keunggulan_4_desc' => 'nullable|string',
            
            // Validasi Kontak & Sosmed
            'whatsapp' => 'nullable|string|max:20',
            'email' => 'nullable|email',
            'address' => 'nullable|string',
            'youtube' => 'nullable|string|url',
            'facebook' => 'nullable|string|url',
            'instagram' => 'nullable|string|url',
            
            // Validasi Gambar Klien
            'client_image_1' => 'nullable|image|max:2048',
            'client_image_2' => 'nullable|image|max:2048',
            'client_image_3' => 'nullable|image|max:2048',
        ]);

        // Handle upload gambar
        foreach (['client_image_1', 'client_image_2', 'client_image_3'] as $imageField) {
            if ($request->hasFile($imageField)) {
                // Hapus gambar lama jika ada
                if ($config->$imageField) {
                    Storage::disk('public')->delete($config->$imageField);
                }
                // Simpan gambar baru
                $validated[$imageField] = $request->file($imageField)->store('clients', 'public');
            } else {
                // Jangan timpa null jika gambar tidak diupload ulang
                unset($validated[$imageField]); 
            }
        }

        $config->update($validated);

        return redirect()->back()->with('success', 'Konfigurasi website berhasil diperbarui!');
    }
}