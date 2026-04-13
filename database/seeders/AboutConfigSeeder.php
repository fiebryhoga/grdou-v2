<?php

namespace Database\Seeders;

use App\Models\AboutConfig;
use Illuminate\Database\Seeder;

class AboutConfigSeeder extends Seeder
{
    public function run(): void
    {
        AboutConfig::updateOrCreate(
            ['id' => 1],
            [
                'hero_title' => 'Lebih Dari Sekadar Sablon & Konveksi',
                'hero_subtitle' => 'Kami adalah mitra strategis Anda dalam mewujudkan identitas visual dan kreativitas melalui pakaian berkualitas tinggi.',
                'story_title' => 'Berawal dari Semangat Kreativitas Lokal',
                'story_text' => "GR-DOU lahir dari dedikasi tinggi terhadap seni cetak dan industri pakaian. Kami memahami bahwa setiap kaos, jaket, atau kemeja yang Anda pesan bukan sekadar kain, melainkan representasi dari komunitas, brand, atau kebanggaan instansi Anda.\n\nDengan memadukan tenaga ahli berpengalaman, teknologi sablon mutakhir, dan material pilihan terbaik, kami berkomitmen untuk terus menghadirkan produk yang awet, nyaman, dan presisi.\n\nHingga hari ini, kami bangga telah dipercaya oleh ratusan klien dari berbagai kalangan—mulai dari brand clothing lokal, organisasi kampus, hingga perusahaan berskala besar.",
                'vision_text' => 'Menjadi vendor konveksi & sablon nomor 1 yang paling diandalkan dan dipercaya.',
                'workshop_image' => null,
                'stat_years' => '5+',
                'stat_clients' => '200+',
                'stat_products' => '50K+',
                'stat_satisfaction' => '100%',
            ]
        );
    }
}