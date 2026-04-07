<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function checkout(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'customer_name'    => 'required|string|max:255',
            'customer_email'   => 'required|email|max:255',
            'customer_phone'   => 'required|string|max:20',
            'delivery_type'    => 'required|in:shipping,pickup',
            'items'            => 'required|array',
            'items.*.id'       => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            // Kita validasi variants agar dipastikan array
            'items.*.variants' => 'nullable|array', 
        ]);

        try {
            DB::beginTransaction();

            $totalProductPrice = 0;
            $orderItemsData = [];
            $midtransItems = [];

            // --- 2. LOOP ITEMS & HITUNG ADDONS (PERBAIKAN DISINI) ---
            foreach ($request->items as $index => $item) {
                // Ambil Produk dari DB
                $product = Product::findOrFail($item['id']);
                
                // Harga Dasar
                $basePrice = (int) $product->base_price;
                
                // Ambil Variants & Addons dari request React
                $variants = $item['variants'] ?? [];
                
                // === LOGIKA HITUNG ADDONS ===
                $addonsTotal = 0;
                $addonNames = []; // Untuk Log debugging

                if (!empty($variants['addons']) && is_array($variants['addons'])) {
                    foreach ($variants['addons'] as $addon) {
                        // Paksa ambil harga, jika tidak ada set 0
                        $price = isset($addon['price']) ? (int) $addon['price'] : 0;
                        
                        if ($price > 0) {
                            $addonsTotal += $price;
                            $addonNames[] = ($addon['name'] ?? 'Addon') . " (+$price)";
                        }
                    }
                }

                // HARGA FINAL SATUAN = Harga Dasar + Total Addons
                $finalUnitPrice = $basePrice + $addonsTotal;

                // Hitung Subtotal (Harga Final x Quantity)
                $quantity = (int) $item['quantity'];
                $subtotal = $finalUnitPrice * $quantity;
                $totalProductPrice += $subtotal;

                // --- LOGGING DEBUGGING (Cek di storage/logs/laravel.log) ---
                Log::info("CHECKOUT CALCULATION:");
                Log::info("- Product: {$product->name}");
                Log::info("- Base Price: {$basePrice}");
                Log::info("- Addons Found: " . implode(', ', $addonNames));
                Log::info("- Total Addons Cost: {$addonsTotal}");
                Log::info("- Final Unit Price: {$finalUnitPrice}");
                Log::info("----------------------------------");

                // Handle Upload File (Sama seperti sebelumnya)
                $uploadedPaths = [];
                if ($request->hasFile("items.{$index}.design_files")) {
                    foreach ($request->file("items.{$index}.design_files") as $file) {
                        $filename = time() . '_' . $product->id . '_' . Str::random(5) . '.' . $file->getClientOriginalExtension();
                        $path = $file->storeAs('designs', $filename, 'public');
                        $uploadedPaths[] = '/storage/' . $path;
                    }
                }

                // Simpan ke Array Database
                $orderItemsData[] = [
                    'product_id'   => $product->id,
                    'product_name' => $product->name,
                    'price'        => $finalUnitPrice, // PENTING: Masukkan harga final
                    'quantity'     => $quantity,
                    'variants'     => json_encode($variants),
                    'design_file'  => count($uploadedPaths) > 0 ? json_encode($uploadedPaths) : null,
                ];

                // Simpan ke Array Midtrans
                $midtransItems[] = [
                    'id'       => (string) $product->id,
                    'price'    => $finalUnitPrice, // PENTING: Masukkan harga final
                    'quantity' => $quantity,
                    'name'     => substr($product->name, 0, 40), // Midtrans limit character
                ];
            }

            // --- 3. SETTING PENGIRIMAN ---
            $shippingCost = 0;
            
            if ($request->delivery_type === 'shipping') {
                $finalAddress = strtoupper(
                    "{$request->address_detail}, DS. {$request->village}, KEC. {$request->district}, {$request->city}, {$request->province}"
                );
                $courierName = 'Ekspedisi (COD Ongkir)';
                $serviceName = 'Bayar Ongkir di Tujuan';
            } else {
                $finalAddress = 'AMBIL DI TOKO';
                $courierName = 'Pickup';
                $serviceName = 'Ambil Sendiri';
            }

            // Total Akhir
            $grandTotal = $totalProductPrice + $shippingCost;

            // --- 4. CREATE ORDER DB ---
            $order = Order::create([
                'user_id'          => auth()->id() ?? null,
                'order_number'     => 'INV-' . time() . '-' . Str::upper(Str::random(4)),
                'total_price'      => $grandTotal,
                'status'           => 'pending',
                'customer_name'    => $request->customer_name,
                'customer_email'   => $request->customer_email,
                'customer_phone'   => $request->customer_phone,
                'shipping_address' => $finalAddress,
                'shipping_cost'    => 0,
                'shipping_courier' => $courierName,
                'shipping_service' => $serviceName,
            ]);

            foreach ($orderItemsData as $data) {
                $data['order_id'] = $order->id;
                OrderItem::create($data);
            }

            // --- 5. SNAP TOKEN ---
            $params = [
                'transaction_details' => [
                    'order_id'     => $order->order_number,
                    'gross_amount' => $grandTotal, // Pastikan ini pakai total yang sudah dihitung ulang
                ],
                'customer_details' => [
                    'first_name' => $request->customer_name,
                    'email'      => $request->customer_email,
                    'phone'      => $request->customer_phone,
                    'shipping_address' => [
                        'address' => substr($finalAddress, 0, 100)
                    ]
                ],
                'item_details' => $midtransItems,
            ];

            $snapToken = Snap::getSnapToken($params);
            $order->update(['snap_token' => $snapToken]);

            DB::commit();
            return redirect()->route('order.show', $order->id);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Checkout Error: " . $e->getMessage());
            return back()->withErrors(['message' => 'Gagal memproses order: ' . $e->getMessage()]);
        }
    }
    
    public function show(Order $order)
    {
        $order->load('items');
        return Inertia::render('Customer/Order/Show', [
            'order' => $order,
            'clientKey' => config('midtrans.client_key')
        ]);
    }
}