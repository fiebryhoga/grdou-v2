import React from "react";
import { Link } from "@inertiajs/react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const LayananSection = ({ produks = [] }) => {
    // --- DATA DUMMY (FALLBACK) ---
    // Akan ditampilkan jika data 'produks' dari database kosong/null
    const dummyProduks = [
        {
            id: 1,
            nama: "Sablon Kaos Custom",
            deskripsi: "Sablon plastisol, rubber, dan DTF dengan kualitas premium. Cocok untuk event, komunitas, atau brand clothing Anda.",
            gambar: "/assets/images/home/layanan/kaos.jpg", // Pastikan gambar ini ada, atau fallback akan jalan
            harga_mulai: "Rp 45.000",
            label: "Terlaris"
        },
        {
            id: 2,
            nama: "Pembuatan Jaket & Hoodie",
            deskripsi: "Produksi jaket hoodie, zipper, varsity, hingga bomber dengan bahan fleece tebal dan nyaman.",
            gambar: "/assets/images/home/layanan/hoodie.jpg",
            harga_mulai: "Rp 120.000",
            label: "Premium"
        },
        {
            id: 3,
            nama: "Kemeja PDH / PDL",
            deskripsi: "Kemeja seragam kerja, kampus, atau organisasi dengan bahan drill berkualitas dan bordir komputer rapi.",
            gambar: "/assets/images/home/layanan/kemeja.jpg",
            harga_mulai: "Rp 100.000",
            label: "Populer"
        }
    ];

    // Gunakan data dari props jika ada, jika tidak gunakan dummy
    const displayData = produks.length > 0 ? produks : dummyProduks;

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" id="layanan">
            {/* Dekorasi Background Latar Belakang */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-slate-200 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* --- Judul Section --- */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[#277cdd] font-bold tracking-wider uppercase text-sm bg-blue-100 px-4 py-1.5 rounded-full inline-block mb-4">
                        Layanan Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                        Solusi Produksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#277cdd] to-blue-500">Pakaian Terbaik</span> Anda
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg">
                        Kami menyediakan berbagai pilihan layanan konveksi dan sablon untuk memenuhi segala kebutuhan fashion, seragam, dan merchandise Anda.
                    </p>
                </div>

                {/* --- Grid Layanan --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                    {displayData.slice(0, 3).map((item) => (
                        <div 
                            key={item.id} 
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
                        >
                            {/* Gambar Card */}
                            <div className="relative h-64 overflow-hidden bg-slate-100">
                                {item.label && (
                                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                        ✨ {item.label}
                                    </div>
                                )}
                                <img
                                    src={item.gambar}
                                    alt={item.nama}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = "https://placehold.co/600x400/eeeeee/999999?text=Gambar+Layanan";
                                    }}
                                />
                                {/* Overlay Gradient saat hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Konten Card */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#277cdd] transition-colors">
                                    {item.nama}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                                    {item.deskripsi}
                                </p>
                                
                                {/* Bagian Bawah Card (Harga & Tombol) */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Mulai dari</p>
                                        <p className="text-[#277cdd] font-bold text-lg">
                                            {item.harga_mulai || "Hubungi Kami"}
                                        </p>
                                    </div>
                                    <Link 
                                        href={route('katalog.show', item.id || 1)}
                                        className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#277cdd] group-hover:text-white transition-all duration-300"
                                        aria-label="Lihat Detail"
                                    >
                                        <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" size={20}/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Tombol Lihat Semua --- */}
                <div className="text-center mt-16">
                    <Link 
                        href={route('katalog.index')} 
                        className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 font-bold py-3.5 px-8 rounded-full hover:bg-slate-50 hover:text-[#277cdd] hover:border-[#277cdd] transition-all duration-300 shadow-sm"
                    >
                        Lihat Katalog Lengkap
                        <FiArrowRight />
                    </Link>
                </div>
                
            </div>
        </section>
    );
};

export default LayananSection;