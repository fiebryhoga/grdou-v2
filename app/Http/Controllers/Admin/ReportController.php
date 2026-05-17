<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        // Default: 30 hari terakhir jika tidak ada filter
        $startDate = $request->input('start_date', Carbon::now()->subDays(30)->format('Y-m-d'));
        $endDate = $request->input('end_date', Carbon::now()->format('Y-m-d'));

        $validStatuses = ['paid', 'processing', 'finishing', 'packaging', 'ready', 'shipped', 'completed'];
        
        // Query Dasar dengan Filter Tanggal
        $queryBase = Order::whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59']);

        // 1. Metric Cards
        $totalRevenue = (clone $queryBase)->whereIn('status', $validStatuses)->sum('total_price');
        $totalOrders = (clone $queryBase)->count();
        $completedOrders = (clone $queryBase)->where('status', 'completed')->count();

        // 2. Grafik Tren Pendapatan
        $salesData = (clone $queryBase)
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total_price) as total_revenue'),
                DB::raw('COUNT(id) as total_orders')
            )
            ->whereIn('status', $validStatuses)
            ->groupBy('date')
            ->orderBy('date', 'ASC')
            ->get()
            ->map(function ($item) {
                $item->formatted_date = Carbon::parse($item->date)->translatedFormat('d M');
                return $item;
            });

        // 3. Grafik Distribusi Status Pesanan
        $statusData = (clone $queryBase)
            ->select('status', DB::raw('COUNT(id) as count'))
            ->groupBy('status')
            ->get();

        return Inertia::render('Admin/Report/Index', [
            'metrics' => [
                'total_revenue' => $totalRevenue,
                'total_orders' => $totalOrders,
                'completed_orders' => $completedOrders,
            ],
            'salesData' => $salesData,
            'statusData' => $statusData,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]
        ]);
    }

    public function downloadPdf(Request $request)
    {
        // Tangkap parameter tanggal dari URL
        $startDate = $request->input('start_date', Carbon::now()->subDays(30)->format('Y-m-d'));
        $endDate = $request->input('end_date', Carbon::now()->format('Y-m-d'));

        $validStatuses = ['paid', 'processing', 'finishing', 'packaging', 'ready', 'shipped', 'completed'];

        $queryBase = Order::whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59']);

        $metrics = [
            'total_revenue' => (clone $queryBase)->whereIn('status', $validStatuses)->sum('total_price'),
            'total_orders' => (clone $queryBase)->count(),
            'completed_orders' => (clone $queryBase)->where('status', 'completed')->count(),
        ];

        // Ambil data tabel
        $orders = (clone $queryBase)->orderBy('created_at', 'ASC')->get();

        $pdf = Pdf::loadView('admin.reports.sales_pdf', [
            'metrics' => $metrics,
            'orders' => $orders,
            'period' => Carbon::parse($startDate)->translatedFormat('d M Y') . ' - ' . Carbon::parse($endDate)->translatedFormat('d M Y'),
            'print_date' => Carbon::now()->translatedFormat('d F Y H:i'),
        ]);

        return $pdf->download('Laporan-Penjualan-'.$startDate.'-sd-'.$endDate.'.pdf');
    }
}