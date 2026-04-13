<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        Testimonial::create([
            'nama' => 'Bima Arya',
            'jabatan' => 'Ketua Panitia Event Kampus',
            'testimoni' => 'Luar biasa! Sablon kaos panitia kami selesai tepat waktu meskipun pesanan mepet. Kualitas plastisolnya tebal dan warnanya sangat solid. Recommended banget buat anak kampus!',
            'rating' => 5,
            'foto' => null, 
        ]);

        Testimonial::create([
            'nama' => 'Sarah Wijaya',
            'jabatan' => 'Owner Local Brand',
            'testimoni' => 'Sudah 3 kali repeat order pembuatan hoodie di sini. Jahitannya sangat rapi dan bahannya selalu konsisten. Adminnya juga fast respon dan enak diajak diskusi soal desain.',
            'rating' => 5,
            'foto' => null,
        ]);
        
        Testimonial::create([
            'nama' => 'Deni Pratama',
            'jabatan' => 'HRD Perusahaan',
            'testimoni' => 'Bikin seragam PDH kantor disini hasilnya memuaskan. Bordir komputernya detail dan rapi. Hanya saja proses pengiriman agak telat 1 hari dari jadwal, tapi overall sangat bagus.',
            'rating' => 4,
            'foto' => null,
        ]);
        Testimonial::create([
            'nama' => 'Deni Pratama',
            'jabatan' => 'HRD Perusahaan',
            'testimoni' => 'Bikin seragam PDH kantor disini hasilnya memuaskan. Bordir komputernya detail dan rapi. Hanya saja proses pengiriman agak telat 1 hari dari jadwal, tapi overall sangat bagus.',
            'rating' => 4,
            'foto' => null,
        ]);
        Testimonial::create([
            'nama' => 'Deni Pratama',
            'jabatan' => 'HRD Perusahaan',
            'testimoni' => 'Bikin seragam PDH kantor disini hasilnya memuaskan. Bordir komputernya detail dan rapi. Hanya saja proses pengiriman agak telat 1 hari dari jadwal, tapi overall sangat bagus.',
            'rating' => 4,
            'foto' => null,
        ]);
    }
}