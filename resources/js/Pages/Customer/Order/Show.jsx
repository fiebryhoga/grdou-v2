import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { 
    FaCheckCircle, FaClock, FaBoxOpen, FaMapMarkerAlt, 
    FaWhatsapp, FaArrowLeft, FaReceipt, FaCreditCard 
} from 'react-icons/fa';

export default function Show({ order, clientKey }) {
    const [isSnapLoaded, setIsSnapLoaded] = useState(false);

    // Format Rupiah
    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0 
    }).format(price);

    // Format Tanggal
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // --- 1. LOAD SCRIPT MIDTRANS ---
    useEffect(() => {
        if (!clientKey) {
            console.error("Client Key Midtrans tidak ditemukan.");
            return;
        }

        const scriptId = 'midtrans-script';
        const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js"; // Ganti ke production URL jika sudah live

        // Cek jika script sudah ada
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.src = snapSrcUrl;
            script.id = scriptId;
            script.setAttribute('data-client-key', clientKey);
            script.async = true;
            script.onload = () => setIsSnapLoaded(true);
            document.body.appendChild(script);
        } else {
            setIsSnapLoaded(true);
        }
    }, [clientKey]);

    // --- 2. HANDLER PEMBAYARAN ---
    const handlePayment = () => {
        if (!isSnapLoaded || !window.snap) {
            alert("Sistem pembayaran sedang memuat, silakan tunggu sejenak...");
            return;
        }

        if (!order.snap_token) {
            alert("Token pembayaran tidak valid. Silakan refresh halaman.");
            return;
        }

        window.snap.pay(order.snap_token, {
            onSuccess: function(result) {
                // Redirect atau Reload agar status terupdate di tampilan
                router.visit(route('order.show', order.id));
            },
            onPending: function(result) {
                alert("Menunggu pembayaran...");
                router.reload();
            },
            onError: function(result) {
                alert("Pembayaran gagal!");
                console.error(result);
            },
            onClose: function() {
                console.log('Popup ditutup tanpa pembayaran selesai');
            }
        });
    };

    // --- TAMPILAN 1: JIKA SUDAH LUNAS (SUCCESS PAGE) ---
    if (order.status === 'paid' || order.status === 'settlement') {
        return (
            <GuestLayout>
                <Head title={`Lunas - #${order.order_number}`} />
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                    <div className="bg-white max-w-lg w-full rounded-lg shadow-xl p-8 text-center animate-fade-in-up">
                        <div className="mb-6 flex justify-center">
                            <div className="bg-green-100 p-4 rounded-full">
                                <FaCheckCircle className="text-6xl text-green-600" />
                            </div>
                        </div>
                        
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Pembayaran Berhasil!</h1>
                        <p className="text-slate-500 mb-8">
                            Terima kasih, pesanan <strong>#{order.order_number}</strong> Anda sedang kami proses.
                        </p>

                        <div className="bg-slate-50 rounded-lg p-6 border border-slate-100 mb-8 text-left">
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-500">Tanggal Bayar</span>
                                <span className="font-semibold">{formatDate(new Date())}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-500">Metode</span>
                                <span className="font-semibold capitalize">{order.shipping_courier}</span>
                            </div>
                            <div className="flex justify-between pt-4 border-t border-slate-200">
                                <span className="font-bold text-slate-800">Total Bayar</span>
                                <span className="font-bold text-green-600">{formatIDR(order.total_price)}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <a 
                                href={`https://wa.me/6281234567890?text=Halo admin, saya sudah bayar pesanan ${order.order_number}`} 
                                target="_blank"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition"
                            >
                                <FaWhatsapp size={20} /> Konfirmasi ke Admin
                            </a>
                            <Link 
                                href={route('katalog.index')} 
                                className="w-full bg-white border-2 border-slate-200 text-slate-600 font-bold py-3 rounded-lg hover:bg-slate-50 transition"
                            >
                                Kembali Belanja
                            </Link>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        );
    }

    // --- TAMPILAN 2: JIKA BELUM BAYAR (PENDING PAGE) ---
    return (
        <GuestLayout>
            <Head title={`Tagihan #${order.order_number}`} />
            
            <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* KOLOM KIRI: Detail Order */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Header Status */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-slate-400 capitalize tracking-wide">Status Pesanan</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <FaClock className="text-orange-500" />
                                    <span className="font-bold text-orange-600 text-lg capitalize">{order.status}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 capitalize">Order ID</p>
                                <p className="font-mono font-bold text-slate-700">#{order.order_number}</p>
                            </div>
                        </div>

                        {/* Alamat Pengiriman */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                            <h3 className="flex items-center gap-2 font-bold text-slate-800 mb-4 pb-2 border-b">
                                <FaMapMarkerAlt className="text-blue-600" /> Informasi Pengiriman
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <p className="font-semibold text-slate-500 mb-1">Penerima</p>
                                    <p className="font-bold text-slate-800">{order.customer_name}</p>
                                    <p className="text-slate-600">{order.customer_phone}</p>
                                    <p className="text-slate-600">{order.customer_email}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-500 mb-1">Alamat Tujuan</p>
                                    <p className="text-slate-700 leading-relaxed">{order.shipping_address}</p>
                                    <div className="mt-2 inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold">
                                        Kurir: {order.shipping_courier}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* List Barang */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                            <h3 className="flex items-center gap-2 font-bold text-slate-800 mb-4 pb-2 border-b">
                                <FaBoxOpen className="text-blue-600" /> Rincian Item
                            </h3>
                            <div className="space-y-4">
                                {order.items && order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-slate-700">{item.product_name}</p>
                                            <p className="text-xs text-slate-500">
                                                {item.quantity} x {formatIDR(item.price)}
                                            </p>
                                        </div>
                                        <p className="font-semibold text-slate-800">
                                            {formatIDR(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN: Tagihan & Action */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden sticky top-6">
                            <div className="bg-slate-900 p-6 text-center text-white">
                                <p className="text-slate-400 text-xs font-bold capitalize mb-2">Total Tagihan</p>
                                <h2 className="text-3xl font-extrabold">{formatIDR(order.total_price)}</h2>
                            </div>
                            
                            <div className="p-6">
                                <div className="text-center mb-6">
                                    <p className="text-sm text-slate-500 mb-4">
                                        Silakan selesaikan pembayaran untuk memproses pesanan Anda.
                                    </p>
                                    
                                    {order.status === 'pending' ? (
                                        <button 
                                            onClick={handlePayment}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2"
                                        >
                                            <FaCreditCard /> BAYAR SEKARANG
                                        </button>
                                    ) : (
                                        <button disabled className="w-full bg-slate-200 text-slate-500 font-bold py-4 rounded-lg cursor-not-allowed">
                                            {order.status === 'cancelled' ? 'PESANAN DIBATALKAN' : 'SUDAH DIBAYAR'}
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <a 
                                        href={`https://wa.me/6281234567890?text=Halo, saya butuh bantuan untuk order #${order.order_number}`}
                                        target="_blank"
                                        className="block w-full text-center py-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition"
                                    >
                                        Bantuan via WhatsApp
                                    </a>
                                    <Link 
                                        href={route('home')}
                                        className="block w-full text-center py-3 text-slate-400 hover:text-blue-600 text-sm transition"
                                    >
                                        Kembali ke Beranda
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}