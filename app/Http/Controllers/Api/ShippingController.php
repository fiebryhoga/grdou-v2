<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; // Gunakan ini, bawaan Laravel

class ShippingController extends Controller
{
    // 1. Fungsi Mencari Kota (Metode Direct Search sesuai Docs)
    // User mengetik nama kota, API mengembalikan daftar kecamatan & ID-nya
    public function searchDestination(Request $request)
    {
        $search = $request->query('search'); // Misal: "Jakarta"

        $response = Http::withHeaders([
            'key' => env('RAJAONGKIR_API_KEY')
        ])->get(env('RAJAONGKIR_BASE_URL') . '/destination/domestic-destination', [
            'search' => $search,
            'limit' => 10,
            'offset' => 0
        ]);

        return $response->json();
    }

    // 2. Fungsi Cek Ongkir (Logika 200gram)
    public function checkCost(Request $request)
    {
        // Validasi
        $request->validate([
            'destination_subdistrict_id' => 'required', // ID Kecamatan Tujuan (Dapat dari search di atas)
            'qty' => 'required|integer|min:1' // Jumlah Pakaian
        ]);

        // --- LOGIKA BERAT ---
        // 1 Pakaian = 200 gram
        $beratPerItem = 200;
        $totalBerat = $request->qty * $beratPerItem;

        // Panggil API Cost Calculation Komerce
        // Dokumentasi Komerce biasanya butuh 'destination_type' (subdistrict)
        $response = Http::withHeaders([
            'key' => env('RAJAONGKIR_API_KEY')
        ])->post(env('RAJAONGKIR_BASE_URL') . '/calculate/domestic-cost', [
            'origin' => env('ORIGIN_SUBDISTRICT_ID'), // ID Asal (Kecamatan)
            'originType' => 'subdistrict', // Komerce biasanya basisnya kecamatan
            'destination' => $request->destination_subdistrict_id, // ID Tujuan (Kecamatan)
            'destinationType' => 'subdistrict',
            'weight' => $totalBerat,
            'courier' => 'jne:pos:sicepat' // Sesuaikan kurir yang tersedia di Komerce
        ]);

        if ($response->successful()) {
            return response()->json([
                'info_berat' => "Berat total: {$totalBerat} gram ({$request->qty} pakaian)",
                'ongkir' => $response->json()
            ]);
        } else {
            return response()->json([
                'error' => 'Gagal cek ongkir',
                'detail' => $response->json()
            ], $response->status());
        }
    }
}