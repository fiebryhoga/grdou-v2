<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // 1. KAOS POLOS / SABLON CUSTOM
        Product::create([
            'name' => 'Kaos Cotton Combed Custom (Sablon Plastisol)',
            'description' => "Kaos standar distro dengan kualitas bahan terbaik. Cocok untuk event, komunitas, atau merchandise brand.\n\nBisa custom desain sesuka hati dengan sablon Plastisol yang awet dan warna tajam.",
            'base_price' => 65000, // Harga Dasar (Polos/Standar)
            'discount_price' => 85000, // Harga Coret (Markup Marketing)
            'thumbnail' => 'https://placehold.co/600x600/277cdd/white?text=Kaos+Combed', // Placeholder Image
            'images' => [
                'https://placehold.co/600x600/1e293b/white?text=Detail+Jahitan',
                'https://placehold.co/600x600/1e293b/white?text=Varian+Warna',
                'https://placehold.co/600x600/1e293b/white?text=Contoh+Sablon',
            ],
            'is_active' => true,
            'available_sizes' => ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
            
            // SPESIFIKASI TEKNIS (Key-Value)
            'specifications' => [
                ['key' => 'Material', 'value' => '100% Cotton Combed'],
                ['key' => 'Gramasi', 'value' => '140-150 gsm (30s) / 170-180 gsm (24s)'],
                ['key' => 'Model', 'value' => 'O-Neck Regular Fit'],
                ['key' => 'Jahitan', 'value' => 'Rantai Standar Distro'],
            ],

            // ADD-ONS (Opsi Tambahan Berbayar)
            'addons' => [
                [
                    'title' => 'Pilihan Ketebalan Kain',
                    'options' => [
                        ['name' => 'Combed 30s (Standar Adem)', 'price' => 0], // Tidak nambah harga
                        ['name' => 'Combed 24s (Lebih Tebal)', 'price' => 5000], // Nambah 5rb
                    ]
                ],
                [
                    'title' => 'Upgrade Jenis Sablon',
                    'options' => [
                        ['name' => 'Plastisol Ink (Standar)', 'price' => 0],
                        ['name' => 'Discharge (Menyatu Kain)', 'price' => 7000],
                        ['name' => 'High Density (Timbul)', 'price' => 15000],
                    ]
                ],
                [
                    'title' => 'Lengan',
                    'options' => [
                        ['name' => 'Lengan Pendek', 'price' => 0],
                        ['name' => 'Lengan Panjang', 'price' => 10000],
                    ]
                ]
            ]
        ]);

        // 2. HOODIE ZIPPER (CONTOH ADDON RESLETING)
        Product::create([
            'name' => 'Hoodie Zipper Heavyweight Custom',
            'description' => "Hoodie dengan bahan Fleece tebal yang hangat namun tetap nyaman. Dilengkapi resleting metal berkualitas tinggi.",
            'base_price' => 150000,
            'discount_price' => 185000,
            'thumbnail' => 'https://placehold.co/600x600/orange/white?text=Hoodie+Zipper',
            'images' => [
                'https://placehold.co/600x600/333/white?text=Tampak+Depan',
                'https://placehold.co/600x600/333/white?text=Tampak+Belakang',
            ],
            'is_active' => true,
            'available_sizes' => ['M', 'L', 'XL', 'XXL'],
            
            'specifications' => [
                ['key' => 'Bahan', 'value' => 'Cotton Fleece Heavyweight'],
                ['key' => 'Gramasi', 'value' => '330 gsm'],
                ['key' => 'Fitur', 'value' => 'Saku Depan, Tali Katun'],
            ],

            'addons' => [
                [
                    'title' => 'Jenis Resleting (Zipper)',
                    'options' => [
                        ['name' => 'Standard Plastic Rail', 'price' => 0],
                        ['name' => 'YKK Metal Zipper (Silver)', 'price' => 15000], // Lebih mahal
                        ['name' => 'YKK Metal Zipper (Gold)', 'price' => 20000],
                        ['name' => 'Waterproof Zipper', 'price' => 25000],
                    ]
                ],
                [
                    'title' => 'Posisi Sablon/Bordir',
                    'options' => [
                        ['name' => 'Dada Kiri (Simpel)', 'price' => 0],
                        ['name' => 'Dada + Punggung Besar', 'price' => 25000],
                        ['name' => 'Full Print', 'price' => 45000],
                    ]
                ]
            ]
        ]);

        // 3. KEMEJA PDH / KORSA (CONTOH BORDIR)
        Product::create([
            'name' => 'Kemeja PDH/Korsa Organisasi',
            'description' => "Seragam resmi untuk himpunan mahasiswa, organisasi, atau kantor. Bahan drill berkualitas yang awet dan terlihat rapi.",
            'base_price' => 110000,
            'discount_price' => null, // Tidak ada diskon
            'thumbnail' => 'https://placehold.co/600x600/555/white?text=Kemeja+PDH',
            'images' => [],
            'is_active' => true,
            'available_sizes' => ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
            
            'specifications' => [
                ['key' => 'Bahan', 'value' => 'American Drill / Japan Drill'],
                ['key' => 'Bordir', 'value' => 'Komputer (Presisi)'],
            ],

            'addons' => [
                [
                    'title' => 'Pilihan Bahan Drill',
                    'options' => [
                        ['name' => 'American Drill (Standar)', 'price' => 0],
                        ['name' => 'Japan Drill (Lebih Halus)', 'price' => 15000],
                        ['name' => 'Ripstop (Outdoor)', 'price' => 10000],
                    ]
                ],
                [
                    'title' => 'Tambahan Bordir Nama',
                    'options' => [
                        ['name' => 'Tanpa Nama Dada', 'price' => 0],
                        ['name' => 'Pakai Nama Dada', 'price' => 5000],
                    ]
                ]
            ]
        ]);
    }
}