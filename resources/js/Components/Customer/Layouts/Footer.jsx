import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    FaInstagram,
    FaTiktok,
    FaFacebookF,
    FaYoutube,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";

// --- Komponen Helper ---

const FooterLink = ({ href, children }) => (
    <li>
        <Link
            href={href}
            className="text-slate-300 text-sm font-medium hover:text-[#277cdd] hover:pl-2 transition-all duration-300 inline-block"
        >
            {children}
        </Link>
    </li>
);

// Helper untuk Icon Sosmed
const SocialIcon = ({ href, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/50 border border-white/10 text-white hover:bg-[#277cdd] hover:border-[#277cdd] hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm shadow-sm"
    >
        {icon}
    </a>
);

// Helper untuk Item Kontak
const ContactItem = ({ icon, text, href }) => (
    <a 
        href={href} 
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-4 group"
    >
        <div className="mt-0.5 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 border border-white/10 text-[#277cdd] group-hover:bg-[#277cdd] group-hover:text-white transition-colors duration-300 backdrop-blur-sm">
            {icon}
        </div>
        <span className="text-slate-300 text-sm font-light group-hover:text-white transition-colors duration-300 leading-relaxed max-w-xs">
            {text}
        </span>
    </a>
);

// --- Komponen Footer Utama ---

export default function Footer() {
    const { kontak } = usePage().props;
    
    // --- DATA DEFAULT (FALLBACK) ---
    const defaultKontak = {
        alamat: "Jl. Veteran No. 123, Malang, Jawa Timur",
        alamat_status: true,
        nomor_wa: "628123456789",
        nomor_wa_status: true,
        email: "admin@grdou.com",
        email_status: true,
        instagram_url: "#", instagram_status: true,
        tiktok_url: "#", tiktok_status: true,
        facebook_url: "#", facebook_status: true,
        youtube_url: "#", youtube_status: true,
    };

    const data = kontak || defaultKontak;
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative text-white pt-20 pb-10 bg-slate-900 overflow-hidden font-sans">
            
            {/* --- 1. Background Image --- */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-15"
                style={{
                    backgroundImage: "url('/assets/images/home/bg-footer.jpeg')",
                }} 
            ></div>

            {/* --- 2. Overlay Gradient --- */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-900/95 to-slate-900/90"></div>

            {/* --- Konten Footer --- */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* GRID UTAMA */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    
                    {/* Kolom 1: Brand & Intro (Lebar 4/12) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-2">
                            <h2 className="text-3xl font-extrabold tracking-tighter text-white">
                                GR-<span className="text-[#277cdd]">DOU</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed pr-6 font-normal">
                            Mitra produksi sablon & konveksi terpercaya untuk mewujudkan ide kreatif Anda. 
                            Kualitas premium, pengerjaan cepat, dan harga bersahabat untuk setiap jahitan.
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex gap-3 pt-4">
                            {data.instagram_status && <SocialIcon href={data.instagram_url} icon={<FaInstagram />} />}
                            {data.tiktok_status && <SocialIcon href={data.tiktok_url} icon={<FaTiktok />} />}
                            {data.facebook_status && <SocialIcon href={data.facebook_url} icon={<FaFacebookF />} />}
                            {data.youtube_status && <SocialIcon href={data.youtube_url} icon={<FaYoutube />} />}
                        </div>
                    </div>

                    {/* Kolom 2: Quick Links (Lebar 2/12) */}
                    <div className="lg:col-span-2 lg:ml-auto">
                        <h3 className="text-lg font-bold text-white mb-6 relative inline-block tracking-wide">
                            Menu Utama
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#277cdd] rounded-full"></span>
                        </h3>
                        <ul className="space-y-3">
                            <FooterLink href="/">Beranda</FooterLink>
                            <FooterLink href={route('katalog.index')}>Layanan Kami</FooterLink>
                            <FooterLink href={route('galeri.index')}>Portofolio</FooterLink>
                            <FooterLink href={route('tentang.index')}>Tentang Kami</FooterLink>
                        </ul>
                    </div>

                    {/* Kolom 3: Support (Lebar 2/12) */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-white mb-6 relative inline-block tracking-wide">
                            Bantuan
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#277cdd] rounded-full"></span>
                        </h3>
                        <ul className="space-y-3">
                            <FooterLink href={route('order.create')}>Buat Pesanan</FooterLink>
                            <FooterLink href={route('order.track')}>Cek Status</FooterLink>
                            <FooterLink href="#">FAQ</FooterLink>
                            <FooterLink href="#">Syarat & Ketentuan</FooterLink>
                        </ul>
                    </div>

                    {/* Kolom 4: Kontak (Lebar 4/12) */}
                    <div className="lg:col-span-4">
                        <h3 className="text-lg font-bold text-white mb-6 relative inline-block tracking-wide">
                            Hubungi Kami
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#277cdd] rounded-full"></span>
                        </h3>
                        <ul className="space-y-4">
                            {data.alamat_status && (
                                <li>
                                    <ContactItem
                                        href="https://maps.google.com"
                                        icon={<FaMapMarkerAlt />}
                                        text={data.alamat}
                                    />
                                </li>
                            )}
                            {data.nomor_wa_status && (
                                <li>
                                    <ContactItem
                                        href={`https://wa.me/${data.nomor_wa.replace(/\D/g,"")}`}
                                        icon={<FaPhoneAlt />}
                                        text={`+${data.nomor_wa}`}
                                    />
                                </li>
                            )}
                            {data.email_status && (
                                <li>
                                    <ContactItem
                                        href={`mailto:${data.email}`}
                                        icon={<FaEnvelope />}
                                        text={data.email}
                                    />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* --- Bagian Bawah: Peta & Copyright --- */}
                <div className="border-t border-white/10 pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
                    
                    {/* Copyright */}
                    <div className="text-center md:text-left text-slate-500 text-sm font-medium">
                        <p>
                            © {currentYear} <span className="text-white font-bold">GR-Dou Sablon Konveksi</span>.
                        </p>
                        <p className="mt-1 text-xs font-light opacity-70">
                            All Rights Reserved.
                        </p>
                    </div>

                    {/* Peta Kecil (Embed) */}
                    <div className="w-full md:w-1/3 h-24 rounded-lg overflow-hidden bg-slate-800 border border-white/10 relative group shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.151743503259!2d112.61247957476832!3d-7.983259592042129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7882806b5d9283%3A0x62804369a239c05e!2sMalang%2C%20Malang%20City%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="opacity-70 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                        ></iframe>
                        <a 
                            href="https://maps.google.com" 
                            target="_blank" 
                            rel="noreferrer"
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40"
                        >
                            <span className="bg-[#277cdd] px-3 py-1 rounded text-xs text-white font-medium shadow-sm">
                                Buka Peta
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}