// resources/js/Components/Home/Hero.jsx
import React from "react";
import { usePage } from "@inertiajs/react";

const Hero = () => {
    // 1. Ambil data global (shared data)
    const { props } = usePage();
    const { heroSettings, kontak } = props;

    // --- DATA DUMMY (FALLBACK) ---
    // Data ini akan dipakai jika heroSettings atau kontak dari database kosong/null
    const defaultSettings = {
        deskripsi: "Kami menyediakan jasa sablon kaos dan konveksi dengan kualitas premium, pengerjaan cepat, dan harga yang bersahabat untuk komunitas, perusahaan, maupun brand clothing Anda.",
        keunggulan_1: "Kualitas Sablon Premium",
        keunggulan_2: "Bahan Kain Pilihan",
        keunggulan_3: "Garansi Kepuasan 100%"
    };

    const defaultKontak = {
        nomor_wa: "628123456789" // Ganti dengan nomor default Anda
    };

    // Menggabungkan data props dengan data dummy
    const activeSettings = { ...defaultSettings, ...heroSettings };
    const activeKontak = kontak || defaultKontak;

    // 2. Siapkan link WA dinamis
    const waNumber = activeKontak.nomor_wa ? activeKontak.nomor_wa.replace(/\D/g, "") : "";
    const waMessage = "Halo, saya ingin konsultasi pesanan sablon/konveksi.";
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

    // Daftar 3 logo komunitas/klien (Pastikan file gambar ada di public/assets/...)
    const communityLogos = [
        {
            src: "https://via.placeholder.com/150", // Ganti dengan /assets/images/home/clients/logo1.png
            alt: "Klien 1",
        },
        {
            src: "https://via.placeholder.com/150", // Ganti dengan /assets/images/home/clients/logo2.png
            alt: "Klien 2",
        },
        {
            src: "https://via.placeholder.com/150", // Ganti dengan /assets/images/home/clients/logo3.png
            alt: "Klien 3",
        },
    ];

    // SVG Icon untuk checkmark (Icon Ceklis Biru)
    const CheckIcon = () => (
        <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
        </svg>
    );

    return (
        // Mengganti SectionWrapper dengan div container standar agar tidak error
        <section className="bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full flex flex-col md:flex-row items-center py-12 md:py-20 gap-10">
                    
                    {/* Kolom Kiri: Teks & CTA */}
                    <div className="w-full md:w-6/12 flex flex-col justify-center items-start text-left">
                        <h1 className="font-extrabold text-4xl lg:text-5xl text-gray-900 leading-tight">
                            Wujudkan setiap
                            <span className="text-blue-600 relative inline-block">
                                desainmu
                                {/* Dekorasi garis bawah sederhana */}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span> <br />
                            bebaskan <span className="text-blue-600">
                                gayamu
                            </span>{" "}
                            sepenuhnya.
                        </h1>

                        {/* Deskripsi Dinamis */}
                        <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
                            {activeSettings.deskripsi}
                        </p>

                        {/* Poin Keunggulan Dinamis */}
                        <div className="mt-8 space-y-3">
                            {activeSettings.keunggulan_1 && (
                                <div className="flex items-center">
                                    <CheckIcon />
                                    <span className="text-gray-800 font-semibold text-sm sm:text-base">
                                        {activeSettings.keunggulan_1}
                                    </span>
                                </div>
                            )}
                            {activeSettings.keunggulan_2 && (
                                <div className="flex items-center">
                                    <CheckIcon />
                                    <span className="text-gray-800 font-semibold text-sm sm:text-base">
                                        {activeSettings.keunggulan_2}
                                    </span>
                                </div>
                            )}
                            {activeSettings.keunggulan_3 && (
                                <div className="flex items-center">
                                    <CheckIcon />
                                    <span className="text-gray-800 font-semibold text-sm sm:text-base">
                                        {activeSettings.keunggulan_3}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Tombol CTA & Social Proof */}
                        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <a 
                                href={waLink} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 text-white font-bold py-3.5 px-8 rounded-full hover:bg-blue-700 hover:shadow-xl transition duration-300 shadow-lg transform hover:-translate-y-1"
                            >
                                Pesan Sekarang
                            </a>
                            
                            {/* Social Proof Kecil */}
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {communityLogos.map((logo, index) => (
                                        <div key={index} className="bg-white p-0.5 rounded-full ring-2 ring-slate-100">
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={logo.src}
                                                alt={logo.alt}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs font-medium text-gray-500">
                                    <span className="block text-gray-900 font-bold text-sm">100+</span>
                                    Klien Puas
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Gambar */}
                    <div className="w-full md:w-6/12 relative">
                        {/* Background Blob Effect (Opsional untuk estetika) */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                        
                        <img
                            src="/assets/images/home/hero/hero-img.png"
                            alt="Model Kaos Sablon"
                            className="w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition duration-500 ease-in-out"
                            // Tambahkan onError untuk fallback gambar jika file belum ada
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "https://placehold.co/600x600/png?text=Hero+Image";
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;