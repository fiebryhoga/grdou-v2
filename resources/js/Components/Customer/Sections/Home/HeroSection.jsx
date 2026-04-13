import React from "react";
import { usePage } from "@inertiajs/react";

const Hero = () => {
    const { website_config } = usePage().props;

    const waNumber = website_config?.whatsapp ? website_config.whatsapp.replace(/\D/g, "") : "";
    const waMessage = "Halo, saya ingin konsultasi pesanan sablon/konveksi.";
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

    const keunggulanList = website_config?.keunggulan 
        ? website_config.keunggulan.split('\n').filter(item => item.trim() !== '') 
        : [];

    const clientImages = [
        website_config?.client_image_1,
        website_config?.client_image_2,
        website_config?.client_image_3,
    ].filter(Boolean);

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
        <section className="bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full flex flex-col md:flex-row items-center py-12 md:py-20 gap-10">
                    
                    <div className="w-full md:w-6/12 flex flex-col justify-center items-start text-left">
                        <h1 className="font-extrabold text-4xl lg:text-5xl text-gray-900 leading-tight">
                            Wujudkan setiap
                            <span className="text-blue-600 relative inline-block mx-2">
                                desainmu
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span> <br />
                            bebaskan <span className="text-blue-600">
                                gayamu
                            </span>{" "}
                            sepenuhnya.
                        </h1>

                        <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
                            {website_config?.description}
                        </p>

                        <div className="mt-8 space-y-3">
                            {keunggulanList.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <CheckIcon />
                                    <span className="text-gray-800 font-semibold text-sm sm:text-base">
                                        {item.replace(/^\d+[\.\)]\s*/, '')}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <a 
                                href={waLink} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 text-white font-bold py-3.5 px-8 rounded-full hover:bg-blue-700 hover:shadow-xl transition duration-300 shadow-lg transform hover:-translate-y-1"
                            >
                                Pesan Sekarang
                            </a>
                            
                            {clientImages.length > 0 && (
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-3">
                                        {clientImages.map((img, index) => (
                                            <div key={index} className="bg-white p-0.5 rounded-full ring-2 ring-slate-100">
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={`/storage/${img}`}
                                                    alt={`Klien ${index + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-xs font-medium text-gray-500">
                                        <span className="block text-gray-900 font-bold text-sm">100+</span>
                                        Klien Puas
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full md:w-6/12 relative">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                        
                        <img
                            src="/assets/images/home/hero/hero-img.png"
                            alt="Model Kaos Sablon"
                            className="w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition duration-500 ease-in-out"
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