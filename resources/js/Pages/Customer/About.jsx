import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/GuestLayout";
import { FiTarget, FiAward, FiUsers, FiThumbsUp, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function About({ about_config }) {
    const { website_config } = usePage().props;

    const waNumber = website_config?.whatsapp ? website_config.whatsapp.replace(/\D/g, "") : "";
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent("Halo, saya ingin konsultasi pembuatan seragam/kaos.")}`;

    const defaultStory = [
        "GR-DOU lahir dari dedikasi tinggi terhadap seni cetak dan industri pakaian.",
        "Dengan memadukan tenaga ahli berpengalaman, teknologi sablon mutakhir, dan material pilihan terbaik, kami berkomitmen untuk terus menghadirkan produk yang awet, nyaman, dan presisi.",
        "Hingga hari ini, kami bangga telah dipercaya oleh ratusan klien dari berbagai kalangan."
    ];

    const storyParagraphs = about_config?.story_text 
        ? about_config.story_text.split('\n').filter(p => p.trim() !== '') 
        : defaultStory;

    const titleParts = about_config?.hero_title ? about_config.hero_title.split(' ') : ['Lebih', 'Dari', 'Sekadar', 'Sablon', '&', 'Konveksi'];
    const halfIndex = Math.ceil(titleParts.length / 2);
    const titleFirstHalf = titleParts.slice(0, halfIndex).join(' ');
    const titleSecondHalf = titleParts.slice(halfIndex).join(' ');

    const storyTitleParts = about_config?.story_title ? about_config.story_title.split(' ') : ['Berawal', 'dari', 'Semangat', 'Kreativitas', 'Lokal'];
    const storyLastWord = storyTitleParts.pop();
    const storyRest = storyTitleParts.join(' ');

    return (
        <Layout>
            <Head title={`Tentang Kami - ${website_config?.title || 'GR-DOU Sablon & Konveksi'}`} />

            <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-white z-0 pointer-events-none"></div>
                <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] bg-[#277cdd]/10 rounded-full blur-3xl z-0 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-3xl z-0 pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <span className="text-[#277cdd] font-bold tracking-widest uppercase text-xs bg-[#277cdd]/10 px-5 py-2 rounded-full inline-block mb-6">
                        Kenali Kami Lebih Dekat
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                        {titleFirstHalf} <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#277cdd] to-blue-400">
                            {titleSecondHalf}
                        </span>
                    </h1>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        {about_config?.hero_subtitle || 'Kami adalah mitra strategis Anda dalam mewujudkan identitas visual dan kreativitas melalui pakaian berkualitas tinggi.'}
                    </p>
                </div>
            </div>

            <div className="pb-20 lg:pb-28 bg-white overflow-hidden relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        
                        <div className="order-2 lg:order-1 relative z-10">
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                                {storyRest} <span className="text-[#277cdd]">{storyLastWord}</span>
                            </h2>
                            <div className="space-y-6 text-gray-500 text-base leading-relaxed font-medium">
                                {storyParagraphs.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>

                            <div className="mt-10 flex items-center gap-5 p-6 rounded-3xl bg-[#277cdd]/5 border border-[#277cdd]/10">
                                <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-[#277cdd] text-2xl flex-shrink-0">
                                    <FiTarget />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg mb-1">Visi Kami</h4>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                        {about_config?.vision_text || 'Menjadi vendor konveksi & sablon nomor 1 yang paling diandalkan dan dipercaya.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative group">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-50/50 rounded-full blur-3xl -z-10 transition-transform duration-700 group-hover:scale-105"></div>
                            
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-[#277cdd]/10 border-[6px] border-white transform lg:rotate-2 group-hover:rotate-0 transition-transform duration-700 bg-gray-100">
                                <img 
                                    src={about_config?.workshop_image ? `/storage/${about_config.workshop_image}` : "/assets/images/about/workshop.jpg"} 
                                    alt="Proses Produksi" 
                                    className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => { e.target.src = "https://placehold.co/800x600/f8fafc/94a3b8?text=Workshop+Kami"; }} 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                                <div className="absolute bottom-8 left-8 right-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="font-bold text-xl tracking-wide mb-1">Workshop Kami</p>
                                    <p className="text-sm opacity-90 font-medium">Tempat dimana ide kreatif Anda dieksekusi.</p>
                                </div>
                            </div>
                            
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl shadow-[#277cdd]/5 border border-gray-100 hidden sm:block animate-[bounce_4s_infinite]">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 text-2xl">
                                        <FiThumbsUp />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-gray-900 leading-none mb-1">
                                            {about_config?.stat_satisfaction || '100%'}
                                        </p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kualitas Terjamin</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
                <div className="bg-gradient-to-br from-[#277cdd] to-blue-600 rounded-[2.5rem] shadow-2xl shadow-[#277cdd]/20 p-10 lg:p-14 overflow-hidden relative">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>
                    
                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-10 text-center divide-x-0 md:divide-x divide-white/10">
                        <div className="space-y-3">
                            <h3 className="text-4xl lg:text-5xl font-black text-white drop-shadow-sm">
                                {about_config?.stat_years || '5+'}
                            </h3>
                            <p className="text-blue-100 text-sm font-semibold tracking-wider uppercase">Tahun Pengalaman</p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-4xl lg:text-5xl font-black text-white drop-shadow-sm">
                                {about_config?.stat_clients || '200+'}
                            </h3>
                            <p className="text-blue-100 text-sm font-semibold tracking-wider uppercase">Klien Percaya</p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-4xl lg:text-5xl font-black text-white drop-shadow-sm">
                                {about_config?.stat_products || '50K+'}
                            </h3>
                            <p className="text-blue-100 text-sm font-semibold tracking-wider uppercase">Produk Terjual</p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-4xl lg:text-5xl font-black text-white drop-shadow-sm">
                                {about_config?.stat_satisfaction || '100%'}
                            </h3>
                            <p className="text-blue-100 text-sm font-semibold tracking-wider uppercase">Garansi Kepuasan</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-24 bg-white mt-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-[#277cdd] font-bold tracking-widest uppercase text-xs bg-[#277cdd]/10 px-4 py-2 rounded-full inline-block mb-4">
                            Nilai Inti
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Kenapa Harus <span className="text-[#277cdd]">Kami?</span></h2>
                        <p className="text-gray-500 font-medium">Kami memegang teguh 3 prinsip utama dalam setiap pesanan yang kami kerjakan.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#277cdd]/5 hover:border-[#277cdd]/20 transition-all duration-500 transform hover:-translate-y-2 group text-center">
                            <div className="w-20 h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-[#277cdd] text-3xl mb-8 group-hover:scale-110 group-hover:bg-[#277cdd] group-hover:text-white transition-all duration-500">
                                <FiAward />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-wide">Kualitas Premium</h3>
                            <p className="text-gray-500 leading-relaxed text-sm font-medium">
                                Bahan baku kami pilih secara ketat. Tinta sablon awet dan jahitan konveksi kami menjamin tingkat presisi tinggi (quality control ketat).
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#277cdd]/5 hover:border-[#277cdd]/20 transition-all duration-500 transform hover:-translate-y-2 group text-center">
                            <div className="w-20 h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-[#277cdd] text-3xl mb-8 group-hover:scale-110 group-hover:bg-[#277cdd] group-hover:text-white transition-all duration-500">
                                <FiUsers />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-wide">Pelayanan Ramah</h3>
                            <p className="text-gray-500 leading-relaxed text-sm font-medium">
                                Tim customer service kami responsif dan siap membantu Anda dari tahap konsultasi desain, pemilihan bahan, hingga produk sampai di tangan.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#277cdd]/5 hover:border-[#277cdd]/20 transition-all duration-500 transform hover:-translate-y-2 group text-center">
                            <div className="w-20 h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-[#277cdd] text-3xl mb-8 group-hover:scale-110 group-hover:bg-[#277cdd] group-hover:text-white transition-all duration-500">
                                <FiTarget />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-wide">Tepat Waktu</h3>
                            <p className="text-gray-500 leading-relaxed text-sm font-medium">
                                Kapasitas produksi kami besar dan terorganisir. Kami sangat menghargai deadline acara Anda sehingga pesanan dijamin tepat waktu.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-20 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                        Siap Memulai Proyek Anda <br className="hidden sm:block"/> Bersama Kami?
                    </h2>
                    <p className="text-gray-500 mb-10 text-lg font-medium">
                        Jelajahi katalog produk kami atau langsung hubungi tim kami untuk mendiskusikan kebutuhan kustom Anda.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href={route('katalog.index')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#277cdd] text-white font-bold py-4 px-8 rounded-full hover:bg-[#1f63b3] transition-all duration-300 shadow-lg shadow-[#277cdd]/30 transform hover:-translate-y-1"
                        >
                            Lihat Katalog Layanan
                            <FiArrowRight size={18} />
                        </Link>
                        <a 
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-gray-700 border-2 border-gray-200 font-bold py-4 px-8 rounded-full hover:border-[#277cdd]/50 hover:text-[#277cdd] hover:bg-blue-50/50 transition-all duration-300 shadow-sm"
                        >
                            <FaWhatsapp size={20} className="text-emerald-500"/>
                            Chat via WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}