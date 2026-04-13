import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Search, Eye, Calendar, User, 
    CreditCard, ShoppingBag, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function Index({ auth, orders, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    // Handle Pencarian
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.orders.index'), { search }, { preserveState: true });
    };

    // Helper Format Rupiah
    const formatIDR = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

    // Helper Format Tanggal
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    // Helper Badge Status
    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-slate-100 text-slate-600 border-slate-200',
            paid: 'bg-blue-50 text-blue-700 border-blue-200',
            processing: 'bg-yellow-50 text-yellow-700 border-yellow-200',
            finishing: 'bg-orange-50 text-orange-700 border-orange-200',
            packaging: 'bg-purple-50 text-purple-700 border-purple-200',
            ready: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            shipped: 'bg-teal-50 text-teal-700 border-teal-200',
            completed: 'bg-green-50 text-green-700 border-green-200',
            cancel: 'bg-red-50 text-red-700 border-red-200',
            expire: 'bg-red-50 text-red-700 border-red-200',
        };
        return styles[status] || styles.pending;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Daftar Pesanan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header & Search */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Daftar Pesanan</h2>
                            <p className="text-slate-500 text-sm mt-1">Kelola semua transaksi masuk dan status produksi.</p>
                        </div>

                        <form onSubmit={handleSearch} className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input 
                                type="text" 
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm transition"
                                placeholder="Cari No. Invoice / Nama..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                    </div>

                    {/* Table Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 capitalize font-bold text-xs border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4">Invoice ID</th>
                                        <th className="px-6 py-4">Pelanggan</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Total & Item</th>
                                        <th className="px-6 py-4 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {orders.data.length > 0 ? (
                                        orders.data.map((order) => (
                                            <tr key={order.id} className="hover:bg-slate-50/80 transition duration-150">
                                                
                                                {/* Kolom 1: Invoice */}
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-slate-800">{order.order_number}</div>
                                                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                                        <Calendar size={12} /> {formatDate(order.created_at)}
                                                    </div>
                                                </td>

                                                {/* Kolom 2: Customer */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                                            <User size={16} />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-slate-700">{order.customer_name}</div>
                                                            <div className="text-xs text-slate-500">{order.customer_email}</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Kolom 3: Status */}
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize ${getStatusBadge(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </td>

                                                {/* Kolom 4: Total */}
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-slate-800">{formatIDR(order.total_price)}</div>
                                                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                                        <ShoppingBag size={12} /> {order.items_count || order.items?.length || '-'} Item
                                                    </div>
                                                </td>

                                                {/* Kolom 5: Aksi */}
                                                <td className="px-6 py-4 text-center">
                                                    <Link 
                                                        href={route('admin.orders.show', order.id)}
                                                        className="inline-flex items-center justify-center p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition shadow-sm"
                                                        title="Lihat Detail"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                                                <div className="flex flex-col items-center justify-center">
                                                    <ShoppingBag size={48} className="text-slate-200 mb-3" />
                                                    <p>Belum ada pesanan ditemukan.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                            <div className="text-xs text-slate-500">
                                Menampilkan {orders.from} - {orders.to} dari {orders.total} data
                            </div>
                            <div className="flex gap-2">
                                {orders.links.map((link, k) => (
                                    <Link
                                        key={k}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1 text-xs font-bold rounded border transition ${
                                            link.active 
                                            ? 'bg-blue-600 text-white border-blue-600' 
                                            : !link.url 
                                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}