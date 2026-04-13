<?php

namespace Database\Seeders;

use App\Models\WebsiteConfig;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WebsiteConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Menggunakan updateOrCreate agar jika seeder dijalankan ulang, 
        // data tidak terduplikasi melainkan hanya diupdate (berdasarkan id 1)
        WebsiteConfig::updateOrCreate(
            ['id' => 1], // Kondisi pencarian
            [
                'title' => 'GRDOU - Website Resmi',
                'description' => 'Kami adalah penyedia layanan terbaik yang berdedikasi untuk memberikan solusi kebutuhan Anda dengan kualitas yang tak tertandingi dan pelayanan yang profesional.',
                'keunggulan' => "1. Kualitas Premium\n2. Harga Kompetitif\n3. Pelayanan Cepat & Tanggap\n4. Berpengalaman di Bidangnya",
                
                // Kontak
                'whatsapp' => '6281234567890',
                'email' => 'info@websiteanda.com',
                'address' => 'Jl. Contoh Alamat No. 123, Kota Malang, Jawa Timur, Indonesia',
                
                // Sosial Media
                'youtube' => 'https://youtube.com/@channelanda',
                'facebook' => 'https://facebook.com/halamananda',
                'instagram' => 'https://instagram.com/akunanda',
                
                // Gambar dibiarkan null sebagai default, nanti admin bisa upload sendiri dari panel
                'client_image_1' => null,
                'client_image_2' => null,
                'client_image_3' => null,
            ]
        );
    }
}