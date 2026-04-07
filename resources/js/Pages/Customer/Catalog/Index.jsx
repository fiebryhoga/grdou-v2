import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/GuestLayout"; 
import { FiArrowRight, FiSearch, FiMessageCircle } from "react-icons/fi";

export default function Catalog({ produks = [] }) {
    // produks di sini adalah collection/array dari model Product
    const { kontak } = usePage().props;

    const [activeCategory, setActiveCategory] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");

    // Helper Format Rupiah
    const formatIDR = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val || 0);

    // --- DATA DUMMY (FALLBACK) ---
    // Struktur data disesuaikan dengan skema tabel 'products'
    const dummyProduks = [
        {
            id: 1,
            name: "Sablon Kaos Plastisol",
            description: "Sablon manual premium dengan tinta plastisol. Hasil cetak tebal, tajam, dan awet bertahun-tahun. Cocok untuk brand distro.",
            thumbnail: "/assets/images/katalog/kaos-plastisol.jpg",
            base_price: 45000,
            specifications: { Kategori: "Kaos & Sablon", Label: "Terlaris" }
        },
        {
            id: 2,
            name: "Jaket Hoodie / Sweater",
            description: "Produksi hoodie jumper atau zipper berbahan Cotton Fleece tebal. Nyaman dipakai dengan pilihan bordir atau sablon.",
            thumbnail: "/assets/images/katalog/hoodie.jpg",
            base_price: 125000,
            specifications: { Kategori: "Jaket & Hoodie", Label: "Populer" }
        },
        {
            id: 3,
            name: "Kemeja PDH / PDL Organisasi",
            description: "Kemeja lapangan atau organisasi dari bahan American/Japan Drill. Jahitan rapi lengkap dengan bordir komputer presisi.",
            thumbnail: "/assets/images/katalog/kemeja-pdh.jpg",
            base_price: 100000,
            specifications: { Kategori: "Kemeja & Seragam" }
        },
    ];

    // Data sumber: Jika produks dari database kosong (atau pagination kosong), gunakan dummy
    // Catatan: Jika produks menggunakan pagination Inertia (produks.data), gunakan produks.data
    const rawData = produks?.data || produks;
    const sourceData = rawData && rawData.length > 0 ? rawData : dummyProduks;

    // Helper untuk mengambil kategori (Bisa diambil dari kolom spesifikasi jika ada)
    const getCategory = (item) => {
        // Asumsi kategori disimpan dalam JSON specifications
        if (item.specifications && item.specifications.Kategori) {
            return item.specifications.Kategori;
        }
        return "Umum";
    };

    const getLabel = (item) => {
        if (item.specifications && item.specifications.Label) {
            return item.specifications.Label;
        }
        return null;
    };

    // Ekstrak unik kategori untuk Filter Tabs
    const categories = ["Semua", ...new Set(sourceData.map(item => getCategory(item)))];

    // Logika Filter Data
    const filteredProduks = sourceData.filter(item => {
        const itemCategory = getCategory(item);
        const matchCategory = activeCategory === "Semua" || itemCategory === activeCategory;
        const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    // Link WA Dinamis untuk CTA Bawah
    const waNumber = kontak?.nomor_wa ? kontak.nomor_wa.replace(/\D/g, "") : "628123456789";
    const waLink = `https://wa.me/${waNumber}?text=Halo,%20saya%20ingin%20konsultasi%20pesanan%20custom.`;

    return (
        <>
            <Head title="Katalog Layanan & Produk - GR-DOU" />

            {/* --- HEADER SECTION --- */}
            <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#0f172a] overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#277cdd] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse-slow"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-[#277cdd] font-bold tracking-widest uppercase text-xs sm:text-sm border border-[#277cdd]/30 bg-[#277cdd]/10 px-4 py-1.5 rounded-full inline-block mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(39,124,221,0.2)]">
                        Katalog Lengkap
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        Wujudkan Pakaian <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#277cdd] to-blue-400">
                            Impian Anda Disini
                        </span>
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Pilih berbagai layanan sablon dan konveksi dengan kualitas bahan premium. Temukan solusi tepat untuk kebutuhan komunitas, event, hingga brand Anda.
                    </p>
                </div>
            </div>

            {/* --- CATALOG CONTENT SECTION --- */}
            <div className="py-16 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* --- Filter & Search Bar --- */}
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
                        
                        {/* Tabs Kategori (Scrollable on mobile) */}
                        <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
                            <div className="flex gap-2 sm:gap-3">
                                {categories.map((kategori, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveCategory(kategori)}
                                        className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                                            activeCategory === kategori
                                                ? "bg-[#277cdd] text-white shadow-md shadow-[#277cdd]/30"
                                                : "bg-white text-slate-500 border border-slate-200 hover:border-[#277cdd] hover:text-[#277cdd]"
                                        }`}
                                    >
                                        {kategori}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="w-full lg:w-80 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FiSearch className="text-slate-400" size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari layanan/produk..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#277cdd]/20 focus:border-[#277cdd] transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* --- Grid Layout Katalog --- */}
                    {filteredProduks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProduks.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-[#277cdd]/10 border border-slate-100 transition-all duration-500 overflow-hidden flex flex-col transform hover:-translate-y-2 relative"
                                >
                                    {/* Gambar Produk */}
                                    <div className="relative h-64 overflow-hidden bg-slate-100">
                                        {/* Label Tag (Terlaris, Populer) */}
                                        {getLabel(item) && (
                                            <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-black px-4 py-1.5 rounded-full shadow-sm">
                                                ✨ {getLabel(item)}
                                            </div>
                                        )}
                                        <img
                                            src={item.thumbnail}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = "https://placehold.co/600x400/eeeeee/999999?text=Gambar+Produk";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Konten Text */}
                                    <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                                        {/* Badge Kategori */}
                                        <span className="text-xs font-bold text-[#277cdd] uppercase tracking-wider mb-2 block">
                                            {getCategory(item)}
                                        </span>
                                        
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#277cdd] transition-colors leading-snug">
                                            {item.name}
                                        </h3>
                                        
                                        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                                            {item.description}
                                        </p>
                                        
                                        {/* Bagian Bawah Card */}
                                        <div className="flex items-end justify-between pt-4 border-t border-slate-100 mt-auto">
                                            <div>
                                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">Mulai Dari</p>
                                                <p className="text-xl font-black text-slate-900">
                                                    {formatIDR(item.base_price)}
                                                </p>
                                            </div>
                                            <Link 
                                                href={route('katalog.show', item.id)}
                                                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-[#277cdd] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md"
                                                aria-label="Lihat Detail"
                                            >
                                                <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" size={22}/>
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    {/* Link Overlay Full Card */}
                                    <Link href={route('katalog.show', item.id)} className="absolute inset-0 z-10" aria-label={`Lihat detail ${item.name}`}></Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* State jika hasil pencarian kosong */
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 text-slate-400 mb-6">
                                <FiSearch size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Layanan Tidak Ditemukan</h3>
                            <p className="text-slate-500">Coba gunakan kata kunci lain atau pilih kategori yang berbeda.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- CTA SECTION BAWAH --- */}
            <div className="bg-white border-t border-slate-100 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                        Tidak Menemukan Apa yang Anda Cari?
                    </h2>
                    <p className="text-slate-500 mb-8">
                        Kami juga melayani custom produksi di luar katalog. Diskusikan ide Anda bersama tim kami untuk mendapatkan penawaran terbaik.
                    </p>
                    <a 
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#277cdd] text-white font-bold py-4 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        <FiMessageCircle size={22} />
                        Konsultasi Custom Order
                    </a>
                </div>
            </div>

            {/* Tambahan CSS kecil untuk menyembunyikan scrollbar bawaan di tab kategori mobile */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </>
    );
}

// Tambahkan Layout persisten
Catalog.layout = (page) => <Layout children={page} />;