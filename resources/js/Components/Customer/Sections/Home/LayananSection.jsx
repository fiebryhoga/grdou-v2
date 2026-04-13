import React from "react";
import { Link } from "@inertiajs/react";
import { FiArrowRight } from "react-icons/fi";

const LayananSection = ({ produks = [] }) => {
    const dummyProduks = [
        {
            id: 1,
            nama: "Sablon Kaos Custom",
            deskripsi: "Sablon plastisol, rubber, dan DTF dengan kualitas premium. Cocok untuk event, komunitas, atau brand clothing Anda.",
            gambar: "/assets/images/home/layanan/kaos.jpg",
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

    const displayData = produks && produks.length > 0 ? produks : dummyProduks;

    return (
        <section className="py-24 bg-white relative overflow-hidden" id="layanan">
            <div className="absolute top-0 left-0 -ml-32 -mt-32 w-96 h-96 bg-[#277cdd]/5 rounded-full blur-3xl z-0 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 -mr-32 -mb-32 w-96 h-96 bg-[#277cdd]/5 rounded-full blur-3xl z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[#277cdd] font-bold tracking-widest uppercase text-xs bg-[#277cdd]/10 px-4 py-2 rounded-full inline-block mb-4">
                        Layanan Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 leading-tight tracking-tight">
                        Solusi Produksi <span className="text-[#277cdd]">Pakaian Terbaik</span> Anda
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed">
                        Kami menyediakan berbagai pilihan layanan konveksi dan sablon untuk memenuhi segala kebutuhan fashion, seragam, dan merchandise Anda dengan kualitas premium.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayData.slice(0, 3).map((item) => (
                        <div 
                            key={item.id} 
                            className="group bg-white rounded-3xl border border-gray-100 hover:border-[#277cdd]/30 hover:shadow-2xl hover:shadow-[#277cdd]/5 transition-all duration-300 flex flex-col overflow-hidden"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                                {item.label && (
                                    <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm text-gray-900 text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full shadow-sm">
                                        ✨ {item.label}
                                    </div>
                                )}
                                <img
                                    src={item.gambar || (item.image ? `/storage/${item.image}` : null)}
                                    alt={item.nama || item.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = "https://placehold.co/600x400/f8fafc/94a3b8?text=Gambar+Produk";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="p-6 sm:p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#277cdd] transition-colors duration-300 line-clamp-1">
                                    {item.nama || item.name}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                    {item.deskripsi || item.description}
                                </p>
                                
                                <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-auto">
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1">
                                            Mulai dari
                                        </p>
                                        <p className="text-[#277cdd] font-bold text-lg">
                                            {item.harga_mulai || (item.price ? `Rp ${Number(item.price).toLocaleString('id-ID')}` : "Hubungi Kami")}
                                        </p>
                                    </div>
                                    <Link 
                                        href={route('katalog.show', item.id)}
                                        className="w-10 h-10 rounded-full bg-[#277cdd]/10 flex items-center justify-center text-[#277cdd] group-hover:bg-[#277cdd] group-hover:text-white transition-all duration-300"
                                    >
                                        <FiArrowRight className="transform group-hover:translate-x-0.5 transition-transform" size={18}/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-14">
                    <Link 
                        href={route('katalog.index')} 
                        className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 font-semibold py-3.5 px-8 rounded-full hover:bg-gray-50 hover:text-[#277cdd] hover:border-[#277cdd]/30 transition-all duration-300 shadow-sm"
                    >
                        Lihat Semua Layanan
                        <FiArrowRight size={18} className="text-gray-400" />
                    </Link>
                </div>
                
            </div>
        </section>
    );
};

export default LayananSection;