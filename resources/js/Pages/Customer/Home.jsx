import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FaTshirt, FaShippingFast, FaMedal, FaCheckCircle } from 'react-icons/fa';

export default function Home(props) {
    return (
        <GuestLayout>
            <Head title={props.title} />

            {/* --- HERO SECTION --- */}
            <section className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden">
                {/* Background Pattern (Opsional) */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 border border-blue-500 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
                        Professional Convection & Screen Printing
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        Wujudkan Desain Impian <br />
                        Menjadi <span className="text-blue-500">Kualitas Nyata</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                        Jasa sablon kaos dan konveksi seragam terpercaya. Kualitas distro, pengerjaan tepat waktu, dan harga bersahabat untuk komunitas maupun instansi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href={route('checkout.form')} 
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition transform hover:-translate-y-1 shadow-lg shadow-blue-500/30"
                        >
                            Buat Pesanan Sekarang
                        </Link>
                        <Link 
                            href="#" 
                            className="px-8 py-4 bg-transparent border border-slate-600 hover:bg-slate-800 text-white font-semibold rounded-full transition"
                        >
                            Lihat Katalog
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- KEUNGGULAN (Why Us) --- */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Kenapa Memilih GR-DOU?</h2>
                        <p className="text-slate-500 mt-2">Standar kualitas tinggi untuk kepuasan pelanggan.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition duration-300 text-center group">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <FaMedal size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Kualitas Premium</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Menggunakan bahan kain terbaik dan tinta sablon standar distro yang awet dan tidak mudah pecah.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition duration-300 text-center group">
                            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <FaTshirt size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Custom Suka-Suka</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Bebas tentukan desain, jenis bahan, hingga ukuran. Satuan oke, partai besar lebih murah.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition duration-300 text-center group">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <FaShippingFast size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Tepat Waktu</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Jaminan pengerjaan sesuai deadline yang disepakati. Kami menghargai waktu Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- LAYANAN POPULER --- */}
            <section className="py-20 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Layanan Populer</h2>
                            <p className="text-slate-500 mt-2">Produk yang paling sering dipesan bulan ini.</p>
                        </div>
                        <Link href="#" className="text-blue-600 font-semibold hover:underline mt-4 md:mt-0">Lihat Semua Layanan &rarr;</Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {['Sablon Kaos', 'Jersey Printing', 'Kemeja PDH/PDL', 'Jaket Hoodie'].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group cursor-pointer">
                                <div className="h-48 bg-slate-200 flex items-center justify-center relative overflow-hidden">
                                    {/* Placeholder Image */}
                                    <FaTshirt className="text-slate-300 text-6xl group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-slate-900 text-lg">{item}</h3>
                                    <p className="text-sm text-slate-500 mt-1">Mulai Rp 65.000</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-24 bg-blue-600 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-700 rounded-full opacity-50 blur-3xl"></div>
                
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Siap Membuat Pesanan Anda?</h2>
                    <p className="text-blue-100 text-lg mb-10">
                        Konsultasikan desain Anda sekarang atau langsung isi formulir pemesanan. Dapatkan penawaran terbaik khusus hari ini.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="https://wa.me/6281234567890" 
                            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-100 transition shadow-lg"
                        >
                            Chat WhatsApp
                        </a>
                        <Link 
                            href={route('checkout.form')}
                            className="px-8 py-4 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-900 transition shadow-lg border border-blue-700"
                        >
                            Isi Form Order
                        </Link>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}