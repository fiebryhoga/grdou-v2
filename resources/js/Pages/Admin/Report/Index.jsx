import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer,
    BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import { FileDown, Filter } from 'lucide-react'; // Tambahkan Icon Filter
import Layout from '@/Layouts/AuthenticatedLayout';

export default function Index({ metrics, salesData, statusData, filters }) {
    
    // State untuk form filter tanggal
    const [startDate, setStartDate] = useState(filters.start_date);
    const [endDate, setEndDate] = useState(filters.end_date);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    };

    const COLORS = {
        pending: '#9ca3af', paid: '#3b82f6', processing: '#eab308', finishing: '#f59e0b', 
        packaging: '#a855f7', ready: '#8b5cf6', shipped: '#6366f1', completed: '#22c55e', 
        cancel: '#ef4444', expire: '#f87171',
    };

    // Fungsi untuk memicu filter
    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.reports.index'), {
            start_date: startDate,
            end_date: endDate
        }, { preserveState: true, replace: true });
    };

    // URL Download PDF Dinamis berdasarkan Filter Tanggal
    const pdfUrl = `${route('admin.reports.download')}?start_date=${startDate}&end_date=${endDate}`;

    return (
        <Layout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Laporan Penjualan</h2>}>
            <Head title="Laporan Penjualan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* TOP ACTION BAR: Filter Tanggal & Tombol Download */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        
                        {/* Filter Form */}
                        <form onSubmit={handleFilter} className="flex flex-col sm:flex-row items-center gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 font-medium">Dari:</span>
                                <input 
                                    type="date" 
                                    value={startDate} 
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm text-sm"
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 font-medium">Sampai:</span>
                                <input 
                                    type="date" 
                                    value={endDate} 
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm text-sm"
                                    required
                                />
                            </div>
                            <button 
                                type="submit"
                                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 px-4 rounded-lg transition-all"
                            >
                                <Filter size={16} /> Terapkan
                            </button>
                        </form>

                        {/* Download PDF Button */}
                        <a 
                            href={pdfUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-5 rounded-lg transition-all shadow-md shadow-red-200 w-full md:w-auto justify-center"
                        >
                            <FileDown size={18} />
                            Unduh Laporan PDF
                        </a>
                    </div>

                    {/* --- KARTU METRIK RINGKASAN --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium">Total Pendapatan (Sukses)</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{formatRupiah(metrics.total_revenue)}</p>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium">Total Seluruh Pesanan</h3>
                            <p className="text-3xl font-bold text-blue-600 mt-2">{metrics.total_orders} <span className="text-sm font-normal text-gray-400">transaksi</span></p>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium">Pesanan Selesai (Completed)</h3>
                            <p className="text-3xl font-bold text-green-500 mt-2">{metrics.completed_orders} <span className="text-sm font-normal text-gray-400">transaksi</span></p>
                        </div>
                    </div>

                    {/* --- GRAFIK AREA: TREN PENDAPATAN --- */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Tren Pendapatan</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="formatted_date" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis tickFormatter={(value) => `Rp ${value / 1000}k`} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <ChartTooltip formatter={(value) => formatRupiah(value)} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Area type="monotone" dataKey="total_revenue" name="Pendapatan" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* --- BARIS BAWAH: GRAFIK STATUS & VOLUME PESANAN --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Distribusi Status Pesanan</h3>
                            <div className="h-72 w-full flex justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={statusData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="count" nameKey="status">
                                            {statusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[entry.status] || '#cbd5e1'} />
                                            ))}
                                        </Pie>
                                        <ChartTooltip contentStyle={{ borderRadius: '8px' }} />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Volume Pesanan Harian</h3>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                        <XAxis dataKey="formatted_date" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <ChartTooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                                        <Bar dataKey="total_orders" name="Jml Pesanan" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}