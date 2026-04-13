<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutConfigController extends Controller
{
    public function edit()
    {
        $config = AboutConfig::firstOrCreate(['id' => 1]);
        
        return Inertia::render('Admin/AboutConfig/Edit', [
            'config' => $config
        ]);
    }

    public function update(Request $request)
    {
        // Gunakan firstOrCreate agar sangat aman
        $config = AboutConfig::firstOrCreate(['id' => 1]);

        $validated = $request->validate([
            'hero_title' => 'nullable|string|max:255',
            'hero_subtitle' => 'nullable|string',
            'story_title' => 'nullable|string|max:255',
            'story_text' => 'nullable|string',
            'vision_text' => 'nullable|string',
            'workshop_image' => 'nullable|image|max:2048',
            'stat_years' => 'nullable|string|max:50',
            'stat_clients' => 'nullable|string|max:50',
            'stat_products' => 'nullable|string|max:50',
            'stat_satisfaction' => 'nullable|string|max:50',
        ]);

        if ($request->hasFile('workshop_image')) {
            if ($config->workshop_image) {
                Storage::disk('public')->delete($config->workshop_image);
            }
            $validated['workshop_image'] = $request->file('workshop_image')->store('about', 'public');
        } else {
            unset($validated['workshop_image']);
        }

        $config->update($validated);

        return redirect()->back()->with('success', 'Konfigurasi halaman tentang berhasil diperbarui!');
    }
}