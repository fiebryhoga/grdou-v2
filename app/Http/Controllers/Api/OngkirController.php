<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Http; 
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class OngkirController extends Controller
{
    private $apiKey;
    private $baseUrl;

    public function __construct()
    {
        // Pastikan ini sesuai dengan .env Anda (Komerce atau RajaOngkir Asli)
        $this->apiKey = env('RAJAONGKIR_API_KEY');
        $this->baseUrl = env('RAJAONGKIR_BASE_URL', 'https://pro.rajaongkir.com/api'); 
    }

    // 1. Ambil Provinsi
    public function getProvinces()
    {
        try {
            // 1. Cek apakah API Key terbaca
            $apiKey = env('RAJAONGKIR_API_KEY');
            if (!$apiKey) {
                return response()->json(['error' => 'API Key tidak ditemukan di .env'], 500);
            }

            // 2. Request ke RajaOngkir dengan 'withoutVerifying()' untuk bypass SSL Localhost
            $response = Http::withoutVerifying() 
                ->withHeaders([
                    'key' => $apiKey
                ])
                ->get(env('RAJAONGKIR_BASE_URL') . '/province');

            // 3. Cek jika API RajaOngkir menolak (Misal: 400 Bad Request)
            if ($response->failed()) {
                return response()->json([
                    'error' => 'Gagal kontak RajaOngkir',
                    'detail' => $response->json()
                ], $response->status());
            }

            // 4. Ambil datanya (Handle struktur data yang berbeda)
            $json = $response->json();
            
            // Logika: RajaOngkir asli pakai ['rajaongkir']['results'], Komerce mungkin beda
            $results = $json['rajaongkir']['results'] ?? $json['data'] ?? [];

            return response()->json($results);

        } catch (\Exception $e) {
            // Ini akan mengirim pesan error asli ke Console Browser
            return response()->json([
                'error' => 'Server Error (Exception)',
                'message' => $e->getMessage(),
                'line' => $e->getLine()
            ], 500);
        }
    }

    // 2. Ambil Kota berdasarkan ID Provinsi
    public function getCities($provinceId)
    {
        $response = Http::withHeaders(['key' => $this->apiKey])
                        ->get($this->baseUrl . '/city', ['province' => $provinceId]);

        $data = $response->json();
        $list = $data['rajaongkir']['results'] ?? $data['data'] ?? [];

        return response()->json($list);
    }

    // 3. Ambil Kecamatan berdasarkan ID Kota (Hanya work di Akun PRO / Komerce)
    public function getDistricts($cityId)
    {
        $response = Http::withHeaders(['key' => $this->apiKey])
                        ->get($this->baseUrl . '/subdistrict', ['city' => $cityId]);

        $data = $response->json();
        $list = $data['rajaongkir']['results'] ?? $data['data'] ?? [];

        return response()->json($list);
    }

    // 4. Cek Ongkir (Revisi agar support Kecamatan)
    public function checkOngkir(Request $request)
    {
        // Jika pakai PRO/Komerce, destination harus ID Kecamatan (subdistrict)
        // Jika Starter, destination harus ID Kota (city)
        $originType = env('RAJAONGKIR_TYPE', 'city'); // city atau subdistrict

        $response = Http::withHeaders(['key' => $this->apiKey])
            ->post($this->baseUrl . '/cost', [
                'origin' => env('RAJAONGKIR_ORIGIN_ID'),
                'originType' => $originType, 
                'destination' => $request->destination_id, // Bisa City ID atau Subdistrict ID
                'destinationType' => $request->destination_type, // 'city' atau 'subdistrict'
                'weight' => $request->weight,
                'courier' => $request->courier
            ]);

        return $response->json();
    }
}