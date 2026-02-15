<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kavist\RajaOngkir\Facades\RajaOngkir;

class OngkirController extends Controller
{
    // 1. Ambil Data Provinsi
    public function getProvinces()
    {
        return RajaOngkir::provinsi()->all();
    }

    // 2. Ambil Data Kota berdasarkan ID Provinsi
    public function getCities($province_id)
    {
        return RajaOngkir::kota()->dariProvinsi($province_id)->get();
    }

    // 3. Cek Harga Ongkir
    public function checkOngkir(Request $request)
    {
        $cost = RajaOngkir::ongkosKirim([
            'origin'        => env('RAJAONGKIR_ORIGIN_ID', 255), // ID Kota Asal (Toko)
            'destination'   => $request->city_id,                // ID Kota Tujuan (Pembeli)
            'weight'        => $request->weight,                 // Berat (Gram)
            'courier'       => $request->courier                 // Kode kurir: jne, pos, tiki
        ])->get();

        return response()->json($cost);
    }
}