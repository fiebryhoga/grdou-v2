<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage; // Jangan lupa import ini
use Illuminate\Support\Str;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;

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
        // 1. Validasi
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'items' => 'required|array',
            'items.*.id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            // Validasi File Desain (Maks 5MB, Gambar/PDF)
            'items.*.design_file' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
        ]);

        try {
            DB::beginTransaction();

            $totalPrice = 0;
            $orderItemsData = [];
            $midtransItems = [];

            // 2. Loop setiap item dalam keranjang
            foreach ($request->items as $index => $item) {
                $product = Product::find($item['id']);
                
                // --- A. HITUNG HARGA (Base + Addons) ---
                $unitPrice = (float) $product->base_price;
                
                // Ambil data varian/addons dari request
                // Format yang dikirim Frontend: variants: { size: 'XL', addons: [{name: 'Bahan A', price: 5000}, ...] }
                $variants = $item['variants'] ?? [];
                $selectedAddons = $variants['addons'] ?? [];

                // Jumlahkan harga add-ons
                if (is_array($selectedAddons)) {
                    foreach ($selectedAddons as $addon) {
                        if (isset($addon['price']) && is_numeric($addon['price'])) {
                            $unitPrice += $addon['price'];
                        }
                    }
                }

                $subtotal = $unitPrice * $item['quantity'];
                $totalPrice += $subtotal;

                // --- B. HANDLE UPLOAD FILE DESAIN ---
                $designPath = null;
                // Cek apakah ada file di index ini
                if ($request->hasFile("items.{$index}.design_file")) {
                    $file = $request->file("items.{$index}.design_file");
                    // Nama file unik: time_productID_random.ext
                    $filename = time() . '_' . $product->id . '_' . Str::random(5) . '.' . $file->getClientOriginalExtension();
                    
                    // Simpan ke storage/app/public/designs
                    $path = $file->storeAs('designs', $filename, 'public');
                    $designPath = '/storage/' . $path;
                }

                // --- C. SIAPKAN DATA UTK DB ---
                $orderItemsData[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'price' => $unitPrice, // Harga Final per item
                    'quantity' => $item['quantity'],
                    'variants' => json_encode($variants), // Simpan detail size & addons
                    'design_file' => $designPath, // Path gambar
                ];

                // --- D. SIAPKAN DATA UTK MIDTRANS ---
                $midtransItems[] = [
                    'id' => $product->id,
                    'price' => (int) $unitPrice,
                    'quantity' => (int) $item['quantity'],
                    'name' => substr($product->name, 0, 50),
                ];
            }

            // 3. Buat Order Utama
            $order = Order::create([
                'user_id' => null, // Guest
                'order_number' => 'INV-' . time() . '-' . Str::upper(Str::random(4)),
                'total_price' => $totalPrice,
                'status' => 'pending',
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'customer_phone' => $request->customer_phone,
                'shipping_address' => $request->shipping_address,
            ]);

            // 4. Simpan Order Items
            foreach ($orderItemsData as $data) {
                $data['order_id'] = $order->id;
                OrderItem::create($data);
            }

            // 5. Midtrans Snap Token
            $params = [
                'transaction_details' => [
                    'order_id' => $order->order_number,
                    'gross_amount' => (int) $totalPrice,
                ],
                'customer_details' => [
                    'first_name' => $request->customer_name,
                    'email' => $request->customer_email,
                    'phone' => $request->customer_phone,
                ],
                'item_details' => $midtransItems,
            ];

            $snapToken = Snap::getSnapToken($params);
            $order->update(['snap_token' => $snapToken]);

            DB::commit();

            return redirect()->route('order.show', $order->id);

        } catch (\Exception $e) {
            DB::rollBack();
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