import React from "react";
import { usePage } from "@inertiajs/react";
import { FiAward, FiClock, FiPenTool, FiShield, FiCheckCircle } from "react-icons/fi";

const KeunggulanSection = ({ keunggulans = [] }) => {
    const { website_config } = usePage().props;

    let parsedData = [];
    if (keunggulans.length === 0 && website_config?.keunggulan) {
        const list = website_config.keunggulan.split('\n').filter(item => item.trim() !== '');
        parsedData = list.map((item, idx) => ({
            id: idx + 1,
            judul: item.replace(/^\d+[\.\)]\s*/, ''),
            deskripsi: "Berkomitmen memberikan hasil terbaik untuk kepuasan Anda dalam setiap tahapan produksi kami.",
        }));
    }

    const dummyKeunggulan = [
        {
            id: 1,
            judul: "Kualitas Premium",
            deskripsi: "Menggunakan tinta sablon dan bahan kain pilihan terbaik untuk memastikan hasil cetak awet, tidak mudah luntur, dan nyaman dipakai.",
            icon: <FiAward size={26} />
        },
        {
            id: 2,
            judul: "Tepat Waktu",
            deskripsi: "Kami menghargai waktu Anda. Kapasitas produksi yang besar memastikan setiap pesanan selesai sesuai dengan deadline yang disepakati.",
            icon: <FiClock size={26} />
        },
        {
            id: 3,
            judul: "Bebas Custom Desain",
            deskripsi: "Tidak punya desain? Tim desainer profesional kami siap membantu merealisasikan ide brilian Anda menjadi karya visual yang nyata.",
            icon: <FiPenTool size={26} />
        },
        {
            id: 4,
            judul: "Garansi 100%",
            deskripsi: "Kepuasan Anda adalah prioritas. Kami memberikan garansi produksi ulang jika terdapat cacat atau ketidaksesuaian pesanan.",
            icon: <FiShield size={26} />
        }
    ];

    const displayData = keunggulans.length > 0 ? keunggulans : (parsedData.length > 0 ? parsedData : dummyKeunggulan);

    const getIcon = (item, index) => {
        if (item.icon) return item.icon;
        const icons = [<FiAward size={26}/>, <FiClock size={26}/>, <FiPenTool size={26}/>, <FiShield size={26}/>, <FiCheckCircle size={26}/>];
        return icons[index % icons.length];
    };

    return (
        <section className="relative py-24 bg-white overflow-hidden" id="keunggulan">
            
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#277cdd]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-[#277cdd] font-bold tracking-widest capitalize text-xs bg-blue-50 px-5 py-2 rounded-full inline-block mb-5">
                        Kenapa Memilih Kami?
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                        Standar Baru dalam <br className="hidden sm:block" />
                        <span className="text-[#277cdd]">
                            Industri Sablon & Konveksi
                        </span>
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Kami tidak hanya sekadar mencetak pakaian. Kami memastikan setiap detail produksi memenuhi standar tertinggi untuk merepresentasikan brand Anda dengan sempurna.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
                    {displayData.map((item, index) => (
                        <div 
                            key={item.id || index}
                            className="group relative p-8 rounded-lg bg-white border border-gray-100 hover:border-[#277cdd]/30 hover:shadow-2xl hover:shadow-[#277cdd]/5 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="relative z-10 w-16 h-16 rounded-lg bg-gradient-to-br from-[#277cdd] to-blue-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500">
                                {getIcon(item, index)}
                            </div>

                            <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-4 tracking-wide group-hover:text-[#277cdd] transition-colors duration-300">
                                {item.judul}
                            </h3>
                            <p className="relative z-10 text-gray-500 text-sm leading-relaxed font-medium transition-colors duration-300">
                                {item.deskripsi}
                            </p>

                            <div className="absolute bottom-0 left-8 right-8 h-[3px] bg-gradient-to-r from-transparent via-[#277cdd] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out"></div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default KeunggulanSection;