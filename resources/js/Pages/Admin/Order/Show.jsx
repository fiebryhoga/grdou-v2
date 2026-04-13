import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    ChevronLeft, Package, User, MapPin, CreditCard, 
    Calendar, FileImage, Download, CheckCircle, Clock 
} from 'lucide-react';

export default function Show({ auth, order }) {
    // Setup form untuk update status produksi
    const { data, setData, patch, processing } = useForm({
        status: order.status,
    });

    const handleUpdateStatus = (e) => {
        e.preventDefault();
        patch(route('admin.orders.update-status', order.id));
    };

    // Helper Format Rupiah
    const formatIDR = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val || 0);

    // Helper Format Tanggal
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    // Helper Parse JSON Aman (untuk varian & file desain)
    const safeParseJSON = (str) => {
        if (!str) return null;
        if (typeof str === 'object') return str;
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    };

    // Helper Status Warna
    const getStatusStyle = (status) => {
        const styles = {
            pending: 'bg-slate-100 text-slate-600',
            paid: 'bg-blue-100 text-blue-700',
            processing: 'bg-yellow-100 text-yellow-700',
            finishing: 'bg-orange-100 text-orange-700',
            packaging: 'bg-purple-100 text-purple-700',
            ready: 'bg-indigo-100 text-indigo-700',
            shipped: 'bg-teal-100 text-teal-700',
            completed: 'bg-green-100 text-green-700',
            cancel: 'bg-red-100 text-red-700',
        };
        return styles[status] || styles.pending;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Detail Pesanan ${order.order_number}`} />

            <div className="py-8 bg-slate-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* --- HEADER --- */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <Link 
                                href={route('admin.orders.index')}
                                className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
                            >
                                <ChevronLeft size={20} />
                            </Link>
                            <div>
                                <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3">
                                    Pesanan {order.order_number}
                                    <span className={`px-3 py-1 text-xs font-bold capitalize tracking-wider rounded-full ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </h2>
                                <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                                    <Calendar size={14} /> {formatDate(order.created_at)}
                                </p>
                            </div>
                        </div>

                        {/* Form Update Status */}
                        <form onSubmit={handleUpdateStatus} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="border-none text-sm font-semibold text-slate-700 focus:ring-0 cursor-pointer bg-slate-50 rounded-lg py-2"
                            >
                                <option value="paid">Sudah Dibayar</option>
                                <option value="processing">Proses Produksi</option>
                                <option value="finishing">Finishing</option>
                                <option value="packaging">Packaging</option>
                                <option value="ready">Siap Diambil/Kirim</option>
                                <option value="shipped">Sedang Dikirim</option>
                                <option value="completed">Selesai</option>
                                <option value="cancel">Dibatalkan</option>
                            </select>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="px-4 py-2 bg-[#277cdd] text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition shadow-sm disabled:opacity-50"
                            >
                                Update
                            </button>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* --- KOLOM KIRI (DETAIL ITEM) --- */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                                    <Package className="text-[#277cdd]" size={20} />
                                    <h3 className="font-bold text-slate-800 text-lg">Detail Produk</h3>
                                </div>
                                
                                <div className="divide-y divide-slate-100">
                                    {order.items.map((item, index) => {
                                        const variants = safeParseJSON(item.variants);
                                        const designFiles = safeParseJSON(item.design_file);
                                        
                                        return (
                                            <div key={item.id || index} className="p-6">
                                                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                                                    <div>
                                                        <h4 className="text-lg font-bold text-slate-900">{item.product_name}</h4>
                                                        <p className="text-sm text-slate-500 font-medium mt-1">
                                                            {formatIDR(item.price)} x {item.quantity} pcs
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs text-slate-400 capitalize font-bold tracking-wider">Subtotal</p>
                                                        <p className="text-lg font-black text-[#277cdd]">{formatIDR(item.price * item.quantity)}</p>
                                                    </div>
                                                </div>

                                                {/* Variants & Addons Box */}
                                                {variants && Object.keys(variants).length > 0 && (
                                                    <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-100">
                                                        <h5 className="text-xs font-bold text-slate-400 capitalize mb-3 tracking-wider">Varian & Spesifikasi</h5>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                                                            
                                                            {/* Render standar Varian (Warna, Ukuran) */}
                                                            {/* Render standar Varian (Warna, Ukuran) */}
                                                            {Object.entries(variants).map(([key, val]) => {
                                                                if (key === 'addons') return null; // Addons di render terpisah
                                                                
                                                                // PERBAIKAN: Cek apakah val adalah object (misal: { XS: 1, M: 2 })
                                                                let displayValue = val;
                                                                if (typeof val === 'object' && val !== null) {
                                                                    // Ubah format object menjadi string, misal: "XS: 1, M: 2"
                                                                    displayValue = Object.entries(val)
                                                                        .map(([subKey, subVal]) => `${subKey}: ${subVal}`)
                                                                        .join(', ');
                                                                }

                                                                return (
                                                                    <div key={key} className="flex justify-between border-b border-slate-200/60 pb-1 text-sm">
                                                                        <span className="text-slate-500 capitalize">{key.replace('_', ' ')}</span>
                                                                        <span className="font-semibold text-slate-800 text-right">{displayValue}</span>
                                                                    </div>
                                                                );
                                                            })}

                                                            {/* Render Addons (Tambahan Harga) */}
                                                            {variants.addons && variants.addons.length > 0 && (
                                                                <div className="col-span-full mt-2">
                                                                    <p className="text-xs font-bold text-slate-400 mb-2">ADD-ONS TERPILIH:</p>
                                                                    <ul className="space-y-1">
                                                                        {variants.addons.map((addon, idx) => (
                                                                            <li key={idx} className="flex items-center gap-2 text-slate-700 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm w-max">
                                                                                <CheckCircle size={14} className="text-green-500" />
                                                                                <span className="font-medium">{addon.name}</span>
                                                                                <span className="text-slate-400 text-xs">(+{formatIDR(addon.price)})</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Design Files Box */}
                                                {designFiles && designFiles.length > 0 && (
                                                    <div>
                                                        <h5 className="text-xs font-bold text-slate-400 capitalize mb-2 tracking-wider">File Desain Pelanggan</h5>
                                                        <div className="flex flex-wrap gap-3">
                                                            {designFiles.map((file, idx) => (
                                                                <a 
                                                                    key={idx}
                                                                    href={file} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg transition-colors border border-blue-100 font-medium text-sm group shadow-sm"
                                                                >
                                                                    <FileImage size={16} />
                                                                    Lihat File {idx + 1}
                                                                    <Download size={14} className="opacity-50 group-hover:opacity-100 ml-1" />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* --- KOLOM KANAN (INFO CUSTOMER & PENGIRIMAN) --- */}
                        <div className="space-y-6">
                            
                            {/* Card Info Pelanggan */}
                            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                                    <User className="text-[#277cdd]" size={18} />
                                    <h3 className="font-bold text-slate-800">Informasi Pelanggan</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <p className="text-xs text-slate-400 capitalize font-bold mb-1">Nama Lengkap</p>
                                        <p className="font-semibold text-slate-800">{order.customer_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 capitalize font-bold mb-1">Email</p>
                                        <p className="font-semibold text-slate-800">{order.customer_email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 capitalize font-bold mb-1">No. WhatsApp</p>
                                        <a href={`https://wa.me/${order.customer_phone.replace(/\D/g, '')}`} target="_blank" className="font-semibold text-[#277cdd] hover:underline">
                                            {order.customer_phone}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Card Pengiriman */}
                            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                                    <MapPin className="text-[#277cdd]" size={18} />
                                    <h3 className="font-bold text-slate-800">Detail Pengiriman</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <p className="text-xs text-slate-400 capitalize font-bold mb-1">Metode Pengiriman</p>
                                        <p className="font-semibold text-slate-800">{order.shipping_courier} - {order.shipping_service}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 capitalize font-bold mb-1">Alamat Tujuan</p>
                                        <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            {order.shipping_address}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Pembayaran */}
                            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                                    <CreditCard className="text-[#277cdd]" size={18} />
                                    <h3 className="font-bold text-slate-800">Ringkasan Pembayaran</h3>
                                </div>
                                <div className="p-6 space-y-3">
                                    <div className="flex justify-between text-sm text-slate-600 font-medium">
                                        <span>Total Harga Produk</span>
                                        <span>{formatIDR(order.total_price - order.shipping_cost)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600 font-medium">
                                        <span>Biaya Pengiriman</span>
                                        <span>{order.shipping_cost > 0 ? formatIDR(order.shipping_cost) : 'Bayar di Tujuan / Pickup'}</span>
                                    </div>
                                    <div className="pt-4 mt-2 border-t border-dashed border-slate-200 flex justify-between items-center">
                                        <span className="font-bold text-slate-800">Grand Total</span>
                                        <span className="text-xl font-black text-[#277cdd]">{formatIDR(order.total_price)}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}