import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/GuestLayout";
import { FiTarget, FiAward, FiUsers, FiThumbsUp, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function About() {
    const { kontak } = usePage().props;

    // Link WA Dinamis untuk CTA Bawah
    const waNumber = kontak?.nomor_wa ? kontak.nomor_wa.replace(/\D/g, "") : "628123456789";
    const waLink = `https://wa.me/${waNumber}?text=Halo,%20saya%20ingin%20konsultasi%20pembuatan%20seragam/kaos.`;

    return (
        <Layout>
            <Head title="Tentang Kami - GR-DOU Sablon & Konveksi" />

            {/* --- HERO SECTION (Dark & Elegant) --- */}
            <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#0f172a] overflow-hidden">
                {/* Background Pattern & Glow */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#277cdd] rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-[#277cdd] font-bold tracking-widest uppercase text-xs sm:text-sm border border-[#277cdd]/30 bg-[#277cdd]/10 px-5 py-2 rounded-full inline-block mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(39,124,221,0.2)]">
                        Kenali Kami Lebih Dekat
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                        Lebih Dari Sekadar <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#277cdd] to-blue-400">
                            Sablon & Konveksi
                        </span>
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Kami adalah mitra strategis Anda dalam mewujudkan identitas visual dan kreativitas melalui pakaian berkualitas tinggi.
                    </p>
                </div>
            </div>

            {/* --- OUR STORY SECTION --- */}
            <div className="py-20 lg:py-28 bg-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        
                        {/* Kiri: Teks Cerita */}
                        <div className="order-2 lg:order-1 relative z-10">
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                                Berawal dari Semangat <span className="text-[#277cdd]">Kreativitas</span> Lokal
                            </h2>
                            <div className="space-y-6 text-slate-600 text-base leading-relaxed font-medium">
                                <p>
                                    GR-DOU lahir dari dedikasi tinggi terhadap seni cetak dan industri pakaian. Kami memahami bahwa setiap kaos, jaket, atau kemeja yang Anda pesan bukan sekadar kain, melainkan representasi dari komunitas, brand, atau kebanggaan instansi Anda.
                                </p>
                                <p>
                                    Dengan memadukan tenaga ahli berpengalaman, teknologi sablon mutakhir, dan material pilihan terbaik, kami berkomitmen untuk terus menghadirkan produk yang awet, nyaman, dan presisi. 
                                </p>
                                <p>
                                    Hingga hari ini, kami bangga telah dipercaya oleh ratusan klien dari berbagai kalangan—mulai dari brand clothing lokal, organisasi kampus, hingga perusahaan berskala besar.
                                </p>
                            </div>

                            <div className="mt-10 flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#277cdd] font-bold text-xl">
                                    <FiTarget />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Visi Kami</h4>
                                    <p className="text-sm text-slate-500">Menjadi vendor konveksi & sablon nomor 1 yang paling diandalkan.</p>
                                </div>
                            </div>
                        </div>

                        {/* Kanan: Gambar/Kolase Modern */}
                        <div className="order-1 lg:order-2 relative">
                            {/* Backdrop blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-slate-100 rounded-full blur-3xl -z-10"></div>
                            
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img 
                                    src="/assets/images/about/workshop.jpg" 
                                    alt="Proses Produksi GR-DOU" 
                                    className="w-full h-auto object-cover aspect-[4/3]"
                                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"; }} // Placeholder Workshop
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <p className="font-bold text-lg">Workshop Kami</p>
                                    <p className="text-sm opacity-90">Tempat dimana ide kreatif Anda dieksekusi.</p>
                                </div>
                            </div>
                            
                            {/* Floating Badge */}
                            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 hidden sm:block animate-bounce-slow">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl">
                                        <FiThumbsUp />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-slate-900">100%</p>
                                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Kualitas Terjamin</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* --- STATISTIC SECTION --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10 lg:-mt-16">
                <div className="bg-gradient-to-br from-[#277cdd] to-blue-800 rounded-3xl shadow-2xl p-8 lg:p-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-white/20">
                        <div className="space-y-2">
                            <h3 className="text-4xl lg:text-5xl font-black text-white">5+</h3>
                            <p className="text-blue-100 text-sm font-medium tracking-wide">Tahun Pengalaman</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-4xl lg:text-5xl font-black text-white">200+</h3>
                            <p className="text-blue-100 text-sm font-medium tracking-wide">Klien Percaya</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-4xl lg:text-5xl font-black text-white">50K+</h3>
                            <p className="text-blue-100 text-sm font-medium tracking-wide">Produk Terjual</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-4xl lg:text-5xl font-black text-white">100%</h3>
                            <p className="text-blue-100 text-sm font-medium tracking-wide">Garansi Kepuasan</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CORE VALUES SECTION --- */}
            <div className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Kenapa Harus <span className="text-[#277cdd]">GR-DOU?</span></h2>
                        <p className="text-slate-600 font-medium">Kami memegang teguh 3 prinsip utama dalam setiap pesanan yang kami kerjakan.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group text-center">
                            <div className="w-20 h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-[#277cdd] text-3xl mb-6 group-hover:scale-110 group-hover:bg-[#277cdd] group-hover:text-white transition-all duration-300">
                                <FiAward />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Kualitas Premium</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                Bahan baku kami pilih secara ketat. Tinta sablon awet dan jahitan konveksi kami menjamin tingkat presisi tinggi (quality control ketat).
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group text-center">
                            <div className="w-20 h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-[#277cdd] text-3xl mb-6 group-hover:scale-110 group-hover:bg-[#277cdd] group-hover:text-white transition-all duration-300">
                                <FiUsers />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Pelayanan Ramah</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                Tim customer service kami responsif dan siap membantu Anda dari tahap konsultasi desain, pemilihan bahan, hingga produk sampai di tangan.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group text-center">
                            <div className="w-20 h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-[#277cdd] text-3xl mb-6 group-hover:scale-110 group-hover:bg-[#277cdd] group-hover:text-white transition-all duration-300">
                                <FiTarget />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Tepat Waktu</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                Kapasitas produksi kami besar dan terorganisir. Kami sangat menghargai *deadline* acara Anda sehingga pesanan dijamin tepat waktu.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CTA BOTTOM --- */}
            <div className="bg-white py-20 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Siap Memulai Proyek Anda <br className="hidden sm:block"/> Bersama Kami?
                    </h2>
                    <p className="text-slate-500 mb-10 text-lg">
                        Jelajahi katalog produk kami atau langsung hubungi tim kami untuk mendiskusikan kebutuhan kustom Anda.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href={route('katalog.index')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#277cdd] text-white font-bold py-4 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-[#277cdd]/30 hover:-translate-y-1"
                        >
                            Lihat Katalog Layanan
                            <FiArrowRight />
                        </Link>
                        <a 
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 font-bold py-4 px-8 rounded-full hover:border-green-500 hover:text-green-600 transition-all duration-300 shadow-sm"
                        >
                            <FaWhatsapp size={20} className="text-green-500"/>
                            Chat via WhatsApp
                        </a>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .animate-bounce-slow {
                    animation: bounce-slow 3s infinite ease-in-out;
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>

        </Layout>
    );
}