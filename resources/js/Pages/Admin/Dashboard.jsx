import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    Users, 
    ShoppingCart, 
    TrendingUp, 
    Clock, 
    CheckCircle2, 
    AlertCircle 
} from 'lucide-react';

export default function Dashboard({ auth }) {
    // Data dummy untuk tampilan
    const stats = [
        { name: 'Total Pesanan', value: '128', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Dalam Produksi', value: '24', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
        { name: 'Selesai Sablon', value: '86', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { name: 'Total Pelanggan', value: '42', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    ];

    const recentOrders = [
        { id: '#GR001', customer: 'Alumni UB', item: 'Kaos Cotton Combed 30s', qty: '50 Pcs', status: 'Produksi', color: 'bg-amber-100 text-amber-700' },
        { id: '#GR002', customer: 'Hafaluxe Vibe', item: 'Hoodie Sablon DTF', qty: '12 Pcs', status: 'Selesai', color: 'bg-emerald-100 text-emerald-700' },
        { id: '#GR003', customer: 'PT. Sarana Inti', item: 'Polo Shirt Bordir', qty: '100 Pcs', status: 'Pending', color: 'bg-slate-100 text-slate-700' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-slate-800 leading-tight">Dashboard Overview</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                {/* Welcome Message */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-extrabold text-slate-900">Selamat Datang, {auth.user.name}! 👋</h3>
                        <p className="text-slate-500 mt-1">Pantau semua pesanan konveksi GR - DOU hari ini.</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95">
                        + Tambah Pesanan Baru
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${item.bg}`}>
                                    <item.icon className={`h-6 w-6 ${item.color}`} />
                                </div>
                                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
                                    <TrendingUp size={12} /> +12%
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{item.name}</p>
                            <h4 className="text-3xl font-black text-slate-900 mt-1">{item.value}</h4>
                        </div>
                    ))}
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders Table */}
                    <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800">Antrean Produksi Terbaru</h3>
                            <button className="text-blue-600 text-sm font-bold hover:underline">Lihat Semua</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.1em] font-bold">
                                    <tr>
                                        <th className="px-6 py-4">ID Order</th>
                                        <th className="px-6 py-4">Pelanggan</th>
                                        <th className="px-6 py-4">Pesanan</th>
                                        <th className="px-6 py-4">Qty</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-sm">
                                    {recentOrders.map((order, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-700">{order.id}</td>
                                            <td className="px-6 py-4 text-slate-600">{order.customer}</td>
                                            <td className="px-6 py-4 text-slate-600">{order.item}</td>
                                            <td className="px-6 py-4 font-medium text-slate-700">{order.qty}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.color}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Info / Notifications */}
                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6">
                        <h3 className="font-bold text-slate-800 mb-6">Info Penting</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                                <AlertCircle className="text-red-600 shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-red-900">Stok Cat Putih Tipis!</p>
                                    <p className="text-xs text-red-700 mt-0.5">Sisa 2 KG, segera restock untuk sablon minggu depan.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                <Clock className="text-blue-600 shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-blue-900">Deadline #GR001</p>
                                    <p className="text-xs text-blue-700 mt-0.5">Pengiriman besok sore pukul 16:00 WIB.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}