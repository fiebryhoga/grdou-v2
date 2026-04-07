import React, { useEffect, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout'; 
// IMPORT CONTEXT (PENTING)
import { useCart } from '@/Contexts/CartContext'; 
import { 
    FaUser, FaPhone, FaEnvelope, FaMapMarkedAlt, 
    FaTruck, FaStore, FaBoxOpen, FaCheckCircle, FaExclamationCircle
} from 'react-icons/fa';

export default function Checkout() {
    const { auth } = usePage().props; 
    
    // --- AMBIL DATA DARI CONTEXT (BUKAN PROPS) ---
    const { cart } = useCart(); 

    // --- STATE LOGIC ---
    const [deliveryType, setDeliveryType] = useState('shipping'); 

    const { data, setData, post, processing, errors } = useForm({
        // Data Diri
        customer_name: auth.user ? auth.user.name : '',
        customer_email: auth.user ? auth.user.email : '',
        customer_phone: '',
        
        // Alamat Manual
        province: '',
        city: '',
        district: '', 
        village: '', 
        address_detail: '',
        
        // Meta Data
        delivery_type: 'shipping', 
        shipping_cost: 0, 
        items: cart // Inisialisasi awal (jika context sudah ready)
    });

    // SINKRONISASI: Setiap kali 'cart' berubah (dari Context/LocalStorage), update form data

    useEffect(() => {
        const formattedItems = cart.map(item => ({
            id: item.id,
            quantity: item.quantity,
            
            // --- PERBAIKAN UTAMA DISINI ---
            // Di Context React namanya 'item.variant' (singular)
            // Di Controller Laravel kita memanggil '$item['variants']' (plural)
            // Kita harus mapping agar namanya cocok:
            variants: item.variant || {}, 
            
            // Pastikan file desain juga terkirim jika ada
            design_files: item.designFiles || [] 
        }));

        setData('items', formattedItems);
    }, [cart]);

    const handleMethodChange = (type) => {
        setDeliveryType(type);
        setData(prev => ({
            ...prev,
            delivery_type: type,
            shipping_cost: 0 
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('checkout.process'));
    };

    // Hitung Total Harga Barang
    const getTotalProductPrice = () => {
        if (!cart || cart.length === 0) return 0;
        return cart.reduce((acc, item) => {
            // Pastikan harga & qty berupa angka (jaga-jaga error tipe data)
            const price = parseFloat(item.finalPrice || item.price) || 0;
            const qty = parseInt(item.quantity) || 0;
            return acc + (price * qty);
        }, 0);
    };

    // TAMPILAN JIKA KERANJANG KOSONG
    // Pastikan cart benar-benar array sebelum di-cek length-nya
    if (!Array.isArray(cart) || cart.length === 0) {
        return (
            <GuestLayout>
                <Head title="Checkout Kosong" />
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full">
                        <FaExclamationCircle className="text-6xl text-gray-300 mb-4 mx-auto" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Belanja Kosong</h2>
                        <p className="text-gray-500 mb-6">Anda belum memilih produk apapun.</p>
                        <a href={route('katalog.index')} className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition">
                            Belanja Sekarang
                        </a>
                    </div>
                </div>
            </GuestLayout>
        )
    }

    return (
        <GuestLayout>
            <Head title="Checkout" />

            <div className="py-12 bg-gray-50 min-h-screen font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Sederhana */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-extrabold text-gray-800">Selesaikan Pesanan</h1>
                        <p className="text-gray-500 mt-2">Lengkapi data diri dan pilih metode pengiriman</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* === KOLOM KIRI (FORM INPUT) === */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* 1. DATA PEMESAN */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                                        <FaUser size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Informasi Pemesan</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                                        <div className="relative">
                                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                                            <input type="text" className="pl-10 w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition"
                                                placeholder="Nama sesuai KTP"
                                                value={data.customer_name} onChange={e => setData('customer_name', e.target.value)} required />
                                        </div>
                                        {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">No. WhatsApp</label>
                                        <div className="relative">
                                            <FaPhone className="absolute left-3 top-3 text-gray-400" />
                                            <input type="text" className="pl-10 w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition"
                                                placeholder="08xxxxxxxxxx"
                                                value={data.customer_phone} onChange={e => setData('customer_phone', e.target.value)} required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                            <input type="email" className="pl-10 w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition"
                                                placeholder="email@contoh.com"
                                                value={data.customer_email} onChange={e => setData('customer_email', e.target.value)} required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 2. METODE & ALAMAT */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                                    <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                                        <FaMapMarkedAlt size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Pengiriman & Alamat</h2>
                                </div>

                                {/* Toggle Button Pilihan */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {/* Opsi 1: Kirim Paket */}
                                    <div 
                                        onClick={() => handleMethodChange('shipping')}
                                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-4
                                        ${deliveryType === 'shipping' 
                                            ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                                            : 'border-gray-200 hover:border-blue-300'}`}>
                                        <div className={`p-3 rounded-full ${deliveryType === 'shipping' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                            <FaTruck size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">Kirim Paket</h3>
                                            <p className="text-xs text-gray-500">Ongkir Bayar Tujuan (COD)</p>
                                        </div>
                                        {deliveryType === 'shipping' && <FaCheckCircle className="ml-auto text-blue-600" size={20}/>}
                                    </div>

                                    {/* Opsi 2: Ambil Sendiri */}
                                    <div 
                                        onClick={() => handleMethodChange('pickup')}
                                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-4
                                        ${deliveryType === 'pickup' 
                                            ? 'border-green-600 bg-green-50 ring-1 ring-green-600' 
                                            : 'border-gray-200 hover:border-green-300'}`}>
                                        <div className={`p-3 rounded-full ${deliveryType === 'pickup' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                            <FaStore size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">Ambil Di Toko</h3>
                                            <p className="text-xs text-gray-500">Datang ke Konveksi</p>
                                        </div>
                                        {deliveryType === 'pickup' && <FaCheckCircle className="ml-auto text-green-600" size={20}/>}
                                    </div>
                                </div>

                                {/* FORM ALAMAT (Hanya muncul jika Kirim Paket) */}
                                {deliveryType === 'shipping' && (
                                    <div className="space-y-5 animate-fade-in-down">
                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                                            <p className="text-sm text-blue-800 flex items-center gap-2">
                                                <FaTruck /> 
                                                <strong>Info:</strong> Ongkos kirim ditanggung pembeli saat paket sampai (COD Ongkir).
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Provinsi</label>
                                                <input type="text" className="w-full rounded-xl border-gray-300 focus:ring-blue-500"
                                                    placeholder="Contoh: Jawa Timur"
                                                    value={data.province} onChange={e => setData('province', e.target.value)} required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Kota/Kabupaten</label>
                                                <input type="text" className="w-full rounded-xl border-gray-300 focus:ring-blue-500"
                                                    placeholder="Contoh: Malang"
                                                    value={data.city} onChange={e => setData('city', e.target.value)} required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Kecamatan</label>
                                                <input type="text" className="w-full rounded-xl border-gray-300 focus:ring-blue-500"
                                                    placeholder="Contoh: Lowokwaru"
                                                    value={data.district} onChange={e => setData('district', e.target.value)} required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Desa/Kelurahan</label>
                                                <input type="text" className="w-full rounded-xl border-gray-300 focus:ring-blue-500"
                                                    placeholder="Contoh: Tlogomas"
                                                    value={data.village} onChange={e => setData('village', e.target.value)} required />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Alamat Lengkap (Jalan, RT/RW, No. Rumah)</label>
                                            <textarea className="w-full rounded-xl border-gray-300 focus:ring-blue-500 h-24"
                                                placeholder="Jl. Mawar No. 12, RT 01 RW 02, Patokan dekat Masjid..."
                                                value={data.address_detail} onChange={e => setData('address_detail', e.target.value)} required />
                                        </div>
                                    </div>
                                )}

                                {/* INFO PICKUP (Hanya muncul jika Ambil Sendiri) */}
                                {deliveryType === 'pickup' && (
                                    <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center animate-fade-in-down">
                                        <FaStore className="text-4xl text-green-600 mx-auto mb-3" />
                                        <h3 className="text-lg font-bold text-green-800">Lokasi Pengambilan</h3>
                                        <p className="text-green-700 mt-1">
                                            Jl. Raya Konveksi No. 99, Kec. Lowokwaru, <br/>
                                            Kota Malang, Jawa Timur.
                                        </p>
                                        <p className="text-xs text-green-600 mt-4 font-semibold bg-green-100 inline-block px-3 py-1 rounded-full">
                                            *Tunjukkan Invoice saat pengambilan
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* === KOLOM KANAN (RINGKASAN) === */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-6">
                                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                                    <div className="bg-gray-100 p-3 rounded-full text-gray-600">
                                        <FaBoxOpen size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Ringkasan</h2>
                                </div>

                                {/* List Item */}
                                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                                    {cart.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-start text-sm border-b border-gray-50 pb-2 last:border-0">
                                            <div>
                                                <p className="font-semibold text-gray-700 line-clamp-2">{item.name}</p>
                                                <p className="text-gray-500 text-xs">
                                                    {item.quantity} x {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.finalPrice || item.price)}
                                                </p>
                                            </div>
                                            <p className="font-semibold text-gray-800 whitespace-nowrap">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format((item.finalPrice || item.price) * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Perhitungan */}
                                <div className="border-t border-dashed pt-4 space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Total Harga Barang</span>
                                        <span className="font-semibold">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(getTotalProductPrice())}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center text-gray-600">
                                        <span>Biaya Pengiriman</span>
                                        {deliveryType === 'pickup' ? (
                                            <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded">GRATIS</span>
                                        ) : (
                                            <span className="text-orange-600 font-bold text-xs bg-orange-50 px-2 py-1 rounded text-right">
                                                BAYAR DI TEMPAT <br/> (COD ONGKIR)
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Total Grand */}
                                <div className="mt-6 pt-4 border-t-2 border-gray-100">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-lg font-bold text-gray-800">Total Bayar</span>
                                        <span className="text-2xl font-extrabold text-blue-600">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(getTotalProductPrice())}
                                        </span>
                                    </div>
                                    {deliveryType === 'shipping' && (
                                        <p className="text-xs text-right text-gray-400 italic">Belum termasuk ongkir ekspedisi</p>
                                    )}
                                </div>

                                <button type="submit" disabled={processing}
                                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    {processing ? 'Memproses...' : (
                                        <>
                                            <FaCheckCircle /> Buat Pesanan
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}