<?php

namespace Database\Seeders;

use App\Models\WebsiteConfig;
use Illuminate\Database\Seeder;

class WebsiteConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        WebsiteConfig::updateOrCreate(
            ['id' => 1],
            [
                'title' => 'GR-DOU Sablon & Konveksi',
                'description' => 'Kami adalah penyedia layanan sablon dan konveksi terbaik yang berdedikasi untuk memberikan solusi kebutuhan pakaian Anda dengan kualitas premium dan pelayanan yang profesional.',
                
                // 4 Keunggulan Baru (Judul dan Deskripsi)
                'keunggulan_1_title' => 'Kualitas Premium',
                'keunggulan_1_desc'  => 'Bahan baku kami pilih secaradit ketat. Tinta sablon awet dan jahitan konveksi kami menjamin tingkat presisi tinggi.',
                
                'keunggulan_2_title' => 'Pelayanan Ramah',
                'keunggulan_2_desc'  => 'Tim responsif dan siap membantu Anda dari tahap konsultasi desain, pemilihan bahan, hingga produk sampai di tangan.',
                
                'keunggulan_3_title' => 'Tepat Waktu',
                'keunggulan_3_desc'  => 'Kapasitas produksi kami besar dan terorganisir. Kami sangat menghargai deadline acara Anda sehingga pesanan dijamin tepat waktu.',
                
                'keunggulan_4_title' => 'Garansi 100%',
                'keunggulan_4_desc'  => 'Kepuasan Anda adalah prioritas utama. Kami memberikan garansi jika terdapat cacat atau ketidaksesuaian pesanan.',
                
                // Kontak
                'whatsapp' => '6281234567890',
                'email' => 'admin@grdou.com',
                'address' => 'Jl. Contoh Alamat No. 123, Kota Anda, Provinsi, Indonesia',
                
                // Sosial Media
                'youtube' => 'https://youtube.com',
                'facebook' => 'https://facebook.com',
                'instagram' => 'https://instagram.com',
                
                // Gambar Klien
                'client_image_1' => null,
                'client_image_2' => null,
                'client_image_3' => null,
            ]
        );
    }
}