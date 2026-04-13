import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/GuestLayout"; 
import { FiArrowRight, FiSearch, FiMessageCircle } from "react-icons/fi";

export default function Catalog({ produks = [] }) {
    const { website_config } = usePage().props;

    const [activeCategory, setActiveCategory] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");

    const formatIDR = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val || 0);

    const dummyProduks = [
        {
            id: 1,
            name: "Sablon Kaos Plastisol",
            description: "Sablon manual premium dengan tinta plastisol. Hasil cetak tebal, tajam, dan awet bertahun-tahun. Cocok untuk brand distro.",
            thumbnail: "/assets/images/home/layanan/kaos.jpg",
            price: 45000,
            category: "Kaos & Sablon",
            label: "Terlaris"
        },
        {
            id: 2,
            name: "Jaket Hoodie / Sweater",
            description: "Produksi hoodie jumper atau zipper berbahan Cotton Fleece tebal. Nyaman dipakai dengan pilihan bordir atau sablon.",
            thumbnail: "/assets/images/home/layanan/hoodie.jpg",
            price: 125000,
            category: "Jaket & Hoodie",
            label: "Premium"
        },
        {
            id: 3,
            name: "Kemeja PDH / PDL Organisasi",
            description: "Kemeja lapangan atau organisasi dari bahan American/Japan Drill. Jahitan rapi lengkap dengan bordir komputer presisi.",
            thumbnail: "/assets/images/home/layanan/kemeja.jpg",
            price: 100000,
            category: "Kemeja & Seragam",
            label: "Populer"
        },
    ];

    const rawData = produks?.data || produks;
    const sourceData = rawData && rawData.length > 0 ? rawData : dummyProduks;

    const getCategory = (item) => item.category || (item.specifications?.Kategori) || "Umum";
    const getLabel = (item) => item.label || (item.specifications?.Label) || null;

    const categories = ["Semua", ...new Set(sourceData.map(item => getCategory(item)))];

    const filteredProduks = sourceData.filter(item => {
        const itemCategory = getCategory(item);
        const matchCategory = activeCategory === "Semua" || itemCategory === activeCategory;
        const matchSearch = (item.name || "").toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const waNumber = website_config?.whatsapp ? website_config.whatsapp.replace(/\D/g, "") : "";
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent("Halo, saya ingin konsultasi pesanan custom di luar katalog.")}`;

    return (
        <>
            <Head title={`Katalog Layanan & Produk - ${website_config?.title || 'GR-DOU'}`} />

            <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-white overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-white z-0 pointer-events-none"></div>
                <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#277cdd]/10 rounded-full blur-3xl z-0 pointer-events-none"></div>
                <div className="absolute bottom-0 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl z-0 pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <span className="text-[#277cdd] font-bold tracking-widest capitalize text-xs bg-[#277cdd]/10 px-4 py-2 rounded-full inline-block mb-5">
                        Katalog Lengkap
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Wujudkan Pakaian <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#277cdd] to-blue-400">
                            Impian Anda Disini
                        </span>
                    </h1>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Pilih berbagai layanan sablon dan konveksi dengan kualitas bahan premium. Temukan solusi tepat untuk kebutuhan komunitas, event, hingga brand Anda.
                    </p>
                </div>
            </div>

            <div className="pb-24 bg-white min-h-screen relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
                        
                        <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <div className="flex gap-2 sm:gap-3">
                                {categories.map((kategori, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveCategory(kategori)}
                                        className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                                            activeCategory === kategori
                                                ? "bg-[#277cdd] text-white shadow-lg shadow-[#277cdd]/30"
                                                : "bg-white text-gray-500 border border-gray-200 hover:border-[#277cdd]/50 hover:text-[#277cdd] hover:bg-blue-50/50"
                                        }`}
                                    >
                                        {kategori}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-80 relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FiSearch className="text-gray-400 group-focus-within:text-[#277cdd] transition-colors" size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari layanan/produk..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#277cdd]/20 focus:border-[#277cdd] transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {filteredProduks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProduks.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="group bg-white rounded-lg border border-gray-100 hover:border-[#277cdd]/30 hover:shadow-2xl hover:shadow-[#277cdd]/5 transition-all duration-300 flex flex-col overflow-hidden relative"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                                        {getLabel(item) && (
                                            <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm text-gray-900 text-[11px] font-bold capitalize tracking-wide px-3 py-1.5 rounded-full shadow-sm">
                                                ✨ {getLabel(item)}
                                            </div>
                                        )}
                                        <img
                                            src={item.image ? `/storage/${item.image}` : item.thumbnail}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = "https://placehold.co/600x400/f8fafc/94a3b8?text=Gambar+Produk";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    <div className="p-6 sm:p-8 flex flex-col flex-grow relative z-10">
                                        <span className="text-[10px] font-bold text-[#277cdd] capitalize tracking-wider mb-2 block">
                                            {getCategory(item)}
                                        </span>
                                        
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#277cdd] transition-colors duration-300 line-clamp-1">
                                            {item.name}
                                        </h3>
                                        
                                        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                            {item.description}
                                        </p>
                                        
                                        <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-auto">
                                            <div>
                                                <p className="text-[11px] text-gray-400 font-medium capitalize tracking-wider mb-1">Mulai Dari</p>
                                                <p className="text-[#277cdd] font-bold text-lg">
                                                    {formatIDR(item.price || item.base_price)}
                                                </p>
                                            </div>
                                            <Link 
                                                href={route('katalog.show', item.id)}
                                                className="w-10 h-10 rounded-full bg-[#277cdd]/10 flex items-center justify-center text-[#277cdd] group-hover:bg-[#277cdd] group-hover:text-white transition-all duration-300 relative z-20"
                                            >
                                                <FiArrowRight className="transform group-hover:translate-x-0.5 transition-transform" size={18}/>
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    <Link href={route('katalog.show', item.id)} className="absolute inset-0 z-0"></Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-sm text-gray-300 mb-6">
                                <FiSearch size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Layanan Tidak Ditemukan</h3>
                            <p className="text-gray-500">Coba gunakan kata kunci lain atau pilih kategori yang berbeda.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white border-t border-gray-100 py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="bg-blue-50 rounded-lg p-8 sm:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#277cdd]/10 rounded-full blur-2xl"></div>
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                Tidak Menemukan Apa yang Anda Cari?
                            </h2>
                            <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
                                Kami juga melayani custom produksi di luar katalog. Diskusikan ide Anda bersama tim kami untuk mendapatkan penawaran terbaik.
                            </p>
                            <a 
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#277cdd] text-white font-bold py-3.5 px-8 rounded-full hover:bg-[#1f63b3] transition-all duration-300 shadow-lg shadow-blue-500/30 transform hover:-translate-y-1"
                            >
                                <FiMessageCircle size={20} />
                                Konsultasi Custom Order
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Catalog.layout = (page) => <Layout children={page} />;