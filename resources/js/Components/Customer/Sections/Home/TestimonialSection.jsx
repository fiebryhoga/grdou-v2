import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const TestimonialSection = ({ testimonials = [] }) => {
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                size={16}
                className={index < rating ? "text-yellow-400" : "text-gray-200"}
            />
        ));
    };

    if (!testimonials || testimonials.length === 0) return null;

    let safeItems = [...testimonials];
    while (safeItems.length < 5) {
        safeItems = [...safeItems, ...testimonials];
    }

    return (
        <section className="py-24 bg-white relative overflow-hidden" id="testimonial">
            <style>
                {`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-100% - 2rem)); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .group:hover .animate-scroll {
                    animation-play-state: paused;
                }
                `}
            </style>

            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#277cdd]/5 rounded-full blur-3xl z-0 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-[#277cdd]/5 rounded-full blur-3xl z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 mb-12">
                <div className="text-center max-w-2xl mx-auto">
                    <span className="text-[#277cdd] font-bold tracking-widest capitalize text-xs bg-[#277cdd]/10 px-4 py-2 rounded-full inline-block mb-4">
                        Testimoni Pelanggan
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 leading-tight tracking-tight">
                        Apa Kata <span className="text-[#277cdd]">Mereka?</span>
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed">
                        Kepercayaan dan kepuasan pelanggan adalah prioritas utama kami. Berikut adalah pengalaman mereka yang telah menggunakan jasa kami.
                    </p>
                </div>
            </div>

            <div className="relative w-full max-w-[1600px] mx-auto overflow-hidden group py-4">
                <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 z-20 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 z-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

                <div className="flex gap-8 w-max">
                    <div className="flex gap-8 animate-scroll min-w-max">
                        {safeItems.map((item, idx) => (
                            <div 
                                key={`first-${item.id || idx}-${idx}`}
                                className="w-[320px] sm:w-[400px] bg-white p-8 rounded-lg border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:border-[#277cdd]/30 transition-colors duration-300 flex flex-col relative whitespace-normal"
                            >
                                <FaQuoteLeft className="absolute top-8 right-8 text-blue-50" size={40} />
                                
                                <div className="flex gap-1 mb-6 relative z-10">
                                    {renderStars(item.rating || 5)}
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow relative z-10 italic">
                                    "{item.testimoni}"
                                </p>

                                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100 relative z-10">
                                    <img 
                                        src={item.foto ? `/storage/${item.foto}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.nama)}&background=277cdd&color=fff`} 
                                        alt={item.nama}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-50"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-base line-clamp-1">
                                            {item.nama}
                                        </h4>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5 line-clamp-1">
                                            {item.jabatan}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-8 animate-scroll min-w-max" aria-hidden="true">
                        {safeItems.map((item, idx) => (
                            <div 
                                key={`second-${item.id || idx}-${idx}`}
                                className="w-[320px] sm:w-[400px] bg-white p-8 rounded-lg border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:border-[#277cdd]/30 transition-colors duration-300 flex flex-col relative whitespace-normal"
                            >
                                <FaQuoteLeft className="absolute top-8 right-8 text-blue-50" size={40} />
                                
                                <div className="flex gap-1 mb-6 relative z-10">
                                    {renderStars(item.rating || 5)}
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow relative z-10 italic">
                                    "{item.testimoni}"
                                </p>

                                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100 relative z-10">
                                    <img 
                                        src={item.foto ? `/storage/${item.foto}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.nama)}&background=277cdd&color=fff`} 
                                        alt={item.nama}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-50"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-base line-clamp-1">
                                            {item.nama}
                                        </h4>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5 line-clamp-1">
                                            {item.jabatan}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;