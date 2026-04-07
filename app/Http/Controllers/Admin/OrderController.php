<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    // Halaman List Order
    public function index(Request $request)
    {
        // Daftar status yang BOLEH muncul di Admin (Sudah Bayar & Proses)
        // Kita menyembunyikan 'pending', 'cancel', dan 'expire'
        $validStatuses = [
            'paid', 
            'processing', 
            'finishing', 
            'packaging', 
            'ready', 
            'shipped', 
            'completed'
        ];

        $orders = Order::query()
            ->withCount('items') // Hitung jumlah item belanja
            
            // --- FILTER UTAMA DISINI ---
            // Hanya ambil order yang statusnya ada di daftar $validStatuses
            ->whereIn('status', $validStatuses)
            
            // Logika Pencarian (Search)
            ->when($request->search, function($query, $search) {
                $query->where(function($q) use ($search) {
                    $q->where('order_number', 'like', "%{$search}%")
                      ->orWhere('customer_name', 'like', "%{$search}%");
                });
            })
            ->latest() // Urutkan dari yang terbaru
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Order/Index', [
            'orders' => $orders,
            'filters' => $request->only(['search']),
        ]);
    }

    // Halaman Detail Order
    public function show($id)
    {
        $order = Order::with('items')->findOrFail($id);
        
        return Inertia::render('Admin/Order/Show', [
            'order' => $order
        ]);
    }

    // Update Status Order (Proses Produksi)
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,paid,processing,finishing,packaging,ready,shipped,completed,cancel'
        ]);

        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);

        return back()->with('success', 'Status pesanan berhasil diperbarui!');
    }
}