import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Show({ order, clientKey }) {
    
    useEffect(() => {
        if (!clientKey) {
            alert("FATAL ERROR: Client Key Midtrans kosong! Cek .env dan jalankan 'php artisan config:clear'");
            return;
        }

        // --- LOGIC PENENTUAN URL ---
        // Biasanya Sandbox pakai awalan SB-, tapi akun Anda unik.
        // Kita paksa pakai URL Sandbox dulu karena settingan .env IS_PRODUCTION=false
        const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        
        const scriptId = 'midtrans-script';
        let script = document.getElementById(scriptId);

        if (!script) {
            script = document.createElement('script');
            script.src = snapSrcUrl;
            script.id = scriptId;
            script.setAttribute('data-client-key', clientKey);
            script.async = true;
            document.body.appendChild(script);
        }

        return () => {
            // Cleanup jika perlu
        };
    }, [clientKey]);

    const handlePayment = () => {
        if (!order.snap_token) {
            alert("Error: Snap Token belum tergenerate. Coba checkout ulang.");
            return;
        }

        if (window.snap) {
            window.snap.pay(order.snap_token, {
                onSuccess: function(result){
                    alert("Pembayaran Berhasil!");
                    window.location.reload();
                },
                onPending: function(result){
                    alert("Menunggu pembayaran...");
                },
                onError: function(result){
                    alert("Pembayaran gagal!");
                    console.error(result);
                },
                onClose: function(){
                    console.log('Popup ditutup');
                }
            });
        } else {
            alert("Script Midtrans belum dimuat dengan benar. Periksa koneksi internet atau Client Key.");
        }
    };

    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
            <Head title={`Order #${order.order_number}`} />

            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                {/* Header */}
                <div className="bg-slate-900 text-white p-8 text-center">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Tagihan</p>
                    <h1 className="text-4xl font-extrabold">{formatIDR(order.total_price)}</h1>
                    <div className="mt-4 inline-block px-4 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/20">
                        #{order.order_number}
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    <div className="text-center">
                        <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold uppercase ${
                            order.status === 'paid' ? 'bg-green-100 text-green-700' :
                            order.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            STATUS: {order.status}
                        </span>
                    </div>

                    <div className="border-t border-slate-100 pt-6">
                        <p className="text-slate-500 text-xs font-bold uppercase mb-4">Detail Pelanggan</p>
                        <p className="font-bold">{order.customer_name}</p>
                        <p className="text-sm text-slate-500">{order.customer_email}</p>
                    </div>
                
                    {/* Tombol Bayar */}
                    {order.status === 'pending' && (
                        <div className="pt-4">
                            <button 
                                onClick={handlePayment}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1"
                            >
                                BAYAR SEKARANG
                            </button>
                            <p className="text-[10px] text-slate-400 mt-2 text-center">
                                Token: {order.snap_token ? order.snap_token.substring(0, 10) + '...' : 'Loading...'}
                            </p>
                        </div>
                    )}
                    
                    {order.status === 'paid' && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center text-green-700 font-bold text-sm">
                            Pembayaran Lunas. Terima kasih!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}