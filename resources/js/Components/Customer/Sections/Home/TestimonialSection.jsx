import React from "react";
import { FaQuoteRight, FaStar } from "react-icons/fa";

const TestimonialSection = ({ testimonials = [] }) => {
    // --- DATA DUMMY (FALLBACK) ---
    // Digunakan jika data dari database kosong
    const dummyTestimonials = [
        {
            id: 1,
            nama: "Bima Arya",
            perusahaan: "Ketua Panitia Event Kampus",
            pesan: "Luar biasa! Sablon kaos panitia kami selesai tepat waktu meskipun pesanan mepet. Kualitas plastisolnya tebal dan warnanya sangat solid. Recommended banget buat anak kampus!",
            foto: "https://i.pravatar.cc/150?img=11",
            rating: 5
        },
        {
            id: 2,
            nama: "Sarah Nabila",
            perusahaan: "Founder Brand Local",
            pesan: "Sebagai owner clothing line, saya sangat perfeksionis soal jahitan dan bahan. GR-DOU berhasil memenuhi standar saya. Cuttingannya rapi dan bahan katunnya premium. Bakal langganan terus!",
            foto: "https://i.pravatar.cc/150?img=5",
            rating: 5
        },
        {
            id: 3,
            nama: "Andi Pratama",
            perusahaan: "HRD PT. Maju Bersama",
            pesan: "Kami memesan seragam kemeja PDH untuk 50 karyawan. Bordir komputernya sangat detail dan presisi. Timnya juga komunikatif saat proses revisi desain. Terima kasih GR-DOU!",
            foto: "https://i.pravatar.cc/150?img=68",
            rating: 5
        }
    ];

    // Gunakan data props jika ada, jika tidak gunakan dummy
    const displayData = testimonials.length > 0 ? testimonials : dummyTestimonials;

    // Helper untuk render bintang
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FaStar 
                    key={i} 
                    size={16} 
                    className={i < (rating || 5) ? "text-amber-400" : "text-slate-200"} 
                />
            );
        }
        return stars;
    };

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" id="testimonial">
            
            {/* --- Dekorasi Background --- */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* --- Judul Section --- */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[#277cdd] font-bold tracking-wider uppercase text-xs sm:text-sm bg-blue-100 px-4 py-1.5 rounded-full inline-block mb-4">
                        Testimoni Pelanggan
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                        Apa Kata <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#277cdd] to-blue-500">Mereka?</span>
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg">
                        Kepercayaan pelanggan adalah kebanggaan kami. Lihat pengalaman mereka yang telah mempercayakan produksi pakaiannya kepada kami.
                    </p>
                </div>

                {/* --- Grid Testimonial --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayData.slice(0, 3).map((item, index) => (
                        <div 
                            key={item.id || index}
                            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-2 relative group flex flex-col"
                        >
                            {/* Ikon Quote (Watermark di belakang) */}
                            <FaQuoteRight className="absolute top-8 right-8 text-slate-50 text-6xl group-hover:text-blue-50 transition-colors duration-300 -z-0" />

                            {/* Bintang Rating */}
                            <div className="flex gap-1 mb-6 relative z-10">
                                {renderStars(item.rating)}
                            </div>

                            {/* Teks Pesan */}
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 flex-grow relative z-10 font-medium italic">
                                "{item.pesan}"
                            </p>

                            {/* Profil Pelanggan */}
                            <div className="flex items-center gap-4 mt-auto border-t border-slate-50 pt-6 relative z-10">
                                {/* Avatar */}
                                <div className="relative">
                                    {item.foto ? (
                                        <img 
                                            src={item.foto} 
                                            alt={item.nama} 
                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.nama)}&background=277cdd&color=fff`;
                                            }}
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-[#277cdd] text-white flex items-center justify-center font-bold ring-2 ring-blue-100">
                                            {item.nama?.charAt(0) || "U"}
                                        </div>
                                    )}
                                    {/* Indikator Verified */}
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                </div>
                                
                                {/* Info Nama & Perusahaan */}
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{item.nama}</h4>
                                    <p className="text-xs sm:text-sm text-slate-500 font-medium">{item.perusahaan || "Pelanggan Setia"}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TestimonialSection;