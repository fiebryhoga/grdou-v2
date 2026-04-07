import React from "react";
import { FiAward, FiClock, FiPenTool, FiShield } from "react-icons/fi";

const KeunggulanSection = ({ keunggulans = [] }) => {
    // --- DATA DUMMY (FALLBACK) ---
    // Digunakan jika data dari database kosong
    const dummyKeunggulan = [
        {
            id: 1,
            judul: "Kualitas Premium",
            deskripsi: "Menggunakan tinta sablon dan bahan kain pilihan terbaik untuk memastikan hasil cetak awet, tidak mudah luntur, dan nyaman dipakai.",
            icon: <FiAward size={28} />
        },
        {
            id: 2,
            judul: "Tepat Waktu",
            deskripsi: "Kami menghargai waktu Anda. Kapasitas produksi yang besar memastikan setiap pesanan selesai sesuai dengan deadline yang disepakati.",
            icon: <FiClock size={28} />
        },
        {
            id: 3,
            judul: "Bebas Custom Desain",
            deskripsi: "Tidak punya desain? Tim desainer profesional kami siap membantu merealisasikan ide brilian Anda menjadi karya visual yang nyata.",
            icon: <FiPenTool size={28} />
        },
        {
            id: 4,
            judul: "Garansi 100%",
            deskripsi: "Kepuasan Anda adalah prioritas. Kami memberikan garansi produksi ulang jika terdapat cacat atau ketidaksesuaian pesanan.",
            icon: <FiShield size={28} />
        }
    ];

    // Jika props keunggulans dari database ada isinya, gunakan itu. Jika tidak, pakai dummy.
    // (Jika dari database tidak ada icon, kita set fallback icon default)
    const displayData = keunggulans.length > 0 ? keunggulans : dummyKeunggulan;

    // Helper untuk assign icon jika data dari DB tidak punya icon
    const getIcon = (item, index) => {
        if (item.icon) return item.icon; // Jika sudah ada komponen icon
        const icons = [<FiAward size={28}/>, <FiClock size={28}/>, <FiPenTool size={28}/>, <FiShield size={28}/>];
        return icons[index % icons.length];
    };

    return (
        <section className="relative py-24 bg-slate-900 overflow-hidden" id="keunggulan">
            
            {/* --- Dekorasi Background (Glow Effects) --- */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#277cdd] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400 rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
            
            {/* Overlay Pattern Lembut (Opsional, memberi tekstur) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* --- Judul Section --- */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-[#277cdd] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm border border-[#277cdd]/30 bg-[#277cdd]/10 px-5 py-2 rounded-full inline-block mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(39,124,221,0.2)]">
                        Kenapa Memilih Kami?
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        Standar Baru dalam <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#277cdd] to-blue-300">
                            Industri Sablon & Konveksi
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Kami tidak hanya sekadar mencetak kaos. Kami memastikan setiap detail produksi memenuhi standar tertinggi untuk merepresentasikan brand Anda dengan sempurna.
                    </p>
                </div>

                {/* --- Grid Keunggulan --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
                    {displayData.map((item, index) => (
                        <div 
                            key={item.id || index}
                            className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-[#277cdd]/50 transition-all duration-500 backdrop-blur-md overflow-hidden"
                        >
                            {/* Efek Sorotan (Glow) di dalam kartu saat dihover */}
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#277cdd] rounded-full blur-[50px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                            {/* Ikon Container */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#277cdd] to-blue-900 flex items-center justify-center text-white mb-8 shadow-lg shadow-[#277cdd]/30 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                                {getIcon(item, index)}
                            </div>

                            {/* Teks Konten */}
                            <h3 className="text-xl font-bold text-white mb-4 tracking-wide group-hover:text-[#277cdd] transition-colors duration-300">
                                {item.judul}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium group-hover:text-slate-300 transition-colors duration-300">
                                {item.deskripsi}
                            </p>

                            {/* Dekorasi Garis bawah */}
                            <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#277cdd]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out"></div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default KeunggulanSection;