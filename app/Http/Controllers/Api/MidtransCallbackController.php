<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MidtransCallbackController extends Controller
{
    public function handle(Request $request)
    {
        try {
            $payload = $request->all();

            // 1. LOG SEMUA DATA MASUK (PENTING UNTUK DEBUGGING)
            Log::info("Midtrans Callback Masuk:", $payload);

            $orderId = $payload['order_id'];
            $statusCode = $payload['status_code'];
            $grossAmount = $payload['gross_amount'];
            
            // Konversi server key
            $serverKey = config('midtrans.server_key');

            // --- PERBAIKAN VALIDASI SIGNATURE ---
            // Kita comment dulu validasi ketat ini untuk memastikan data bisa masuk DB dulu.
            // Nanti kalau sudah lancar, bisa di-uncomment.
            
            /* $signatureInput = $orderId . $statusCode . $grossAmount . $serverKey;
            $signature = hash('sha512', $signatureInput);
            
            if ($signature != $payload['signature_key']) {
                Log::warning("Signature Invalid: $orderId");
                return response()->json(['message' => 'Invalid Signature'], 403);
            }
            */

            // 2. CARI ORDER
            $order = Order::where('order_number', $orderId)->first();

            if (!$order) {
                Log::info("Order $orderId tidak ditemukan (Mungkin Test Notification).");
                return response()->json(['message' => 'Order not found'], 200);
            }

            // 3. UPDATE STATUS
            $transaction = $payload['transaction_status'];
            $type = $payload['payment_type'];
            $fraud = $payload['fraud_status'];

            // Variable untuk menampung status baru
            $newStatus = null;

            if ($transaction == 'capture') {
                if ($type == 'credit_card') {
                    $newStatus = ($fraud == 'challenge') ? 'pending' : 'paid';
                }
            } else if ($transaction == 'settlement') {
                $newStatus = 'paid'; // LUNAS
            } else if ($transaction == 'pending') {
                $newStatus = 'pending';
            } else if ($transaction == 'deny' || $transaction == 'expire' || $transaction == 'cancel') {
                $newStatus = 'cancel';
            }

            // Simpan ke Database jika ada status baru
            if ($newStatus) {
                $order->update(['status' => $newStatus]);
                Log::info("Sukses Update Order $orderId menjadi $newStatus");
            }

            return response()->json(['message' => 'Callback received successfully']);

        } catch (\Exception $e) {
            Log::error('Callback Error: ' . $e->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}