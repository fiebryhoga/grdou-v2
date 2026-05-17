<!DOCTYPE html>
<html>
<head>
    <title>Laporan Penjualan GR-DOU</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #444; padding-bottom: 10px; }
        .summary-box { width: 100%; margin-bottom: 20px; }
        .summary-card { background: #f8f9fa; padding: 15px; border: 1px solid #ddd; width: 30%; display: inline-block; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background-color: #277cdd; color: white; padding: 10px; text-align: left; }
        td { border: 1px solid #eee; padding: 8px; }
        .text-right { text-align: right; }
        .status-badge { padding: 3px 8px; border-radius: 4px; font-size: 10px; text-transform: uppercase; }
    </style>
</head>
<body>
    <div class="header">
        <h1>LAPORAN PENJUALAN GR-DOU</h1>
        <p>Periode Laporan: <strong>{{ $period }}</strong></p>
        <p style="font-size: 10px; color:#666;">Dicetak pada: {{ $print_date }}</p>
    </div>

    <div class="summary-box">
        <div class="summary-card">
            <strong>Total Pendapatan</strong><br>
            Rp {{ number_format($metrics['total_revenue'], 0, ',', '.') }}
        </div>
        <div class="summary-card">
            <strong>Total Transaksi</strong><br>
            {{ $metrics['total_orders'] }} Pesanan
        </div>
        <div class="summary-card">
            <strong>Selesai</strong><br>
            {{ $metrics['completed_orders'] }}
        </div>
    </div>

    <h3>Detail Transaksi Lengkap</h3>
    <table>
        <thead>
            <tr>
                <th>No. Pesanan</th>
                <th>Tanggal</th>
                <th>Pelanggan</th>
                <th>Status</th>
                <th class="text-right">Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orders as $order)
            <tr>
                <td>{{ $order->order_number }}</td>
                <td>{{ $order->created_at->format('d/m/Y') }}</td>
                <td>{{ $order->customer_name }}</td>
                <td>{{ $order->status }}</td>
                <td class="text-right">Rp {{ number_format($order->total_price, 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4" class="text-right"><strong>TOTAL KESELURUHAN</strong></td>
                <td class="text-right"><strong>Rp {{ number_format($metrics['total_revenue'], 0, ',', '.') }}</strong></td>
            </tr>
        </tfoot>
    </table>
</body>
</html>