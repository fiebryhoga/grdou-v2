import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    FaInstagram,
    FaFacebookF,
    FaYoutube,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";

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

export default function Footer() {
    const { website_config } = usePage().props;
    const currentYear = new Date().getFullYear();

    const titleParts = website_config?.title ? website_config.title.split(' ') : ['GR-DOU'];
    const brandFirst = titleParts[0];
    const brandRest = titleParts.slice(1).join(' ');

    return (
        <footer className="relative text-white pt-20 pb-10 bg-slate-900 overflow-hidden font-sans">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-15"
                style={{
                    backgroundImage: "url('/assets/images/home/bg-footer.jpeg')",
                }} 
            ></div>

            <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-900/95 to-slate-900/90"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-2">
                            <h2 className="text-3xl font-extrabold tracking-tighter text-white uppercase">
                                {brandFirst} <span className="text-[#277cdd]">{brandRest}</span>
                            </h2>
                        </div>
                        
                        <p className="text-slate-400 text-sm leading-relaxed pr-6 font-normal">
                            {website_config?.description || 'Mitra produksi sablon & konveksi terpercaya untuk mewujudkan ide kreatif Anda. Kualitas premium, pengerjaan cepat, dan harga bersahabat untuk setiap jahitan.'}
                        </p>

                        <div className="flex gap-3 pt-4">
                            {website_config?.instagram && <SocialIcon href={website_config.instagram} icon={<FaInstagram />} />}
                            {website_config?.facebook && <SocialIcon href={website_config.facebook} icon={<FaFacebookF />} />}
                            {website_config?.youtube && <SocialIcon href={website_config.youtube} icon={<FaYoutube />} />}
                        </div>
                    </div>

                    <div className="lg:col-span-2 lg:ml-auto">
                        <h3 className="text-lg font-bold text-white mb-6 relative inline-block tracking-wide">
                            Menu Utama
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#277cdd] rounded-full"></span>
                        </h3>
                        <ul className="space-y-3">
                            <FooterLink href="/">Beranda</FooterLink>
                            <FooterLink href={route('katalog.index')}>Layanan Kami</FooterLink>
                            <FooterLink href={route('tentang.index')}>Tentang Kami</FooterLink>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-white mb-6 relative inline-block tracking-wide">
                            Bantuan
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#277cdd] rounded-full"></span>
                        </h3>
                        <ul className="space-y-3">
                            <FooterLink href={route('order.create')}>Buat Pesanan</FooterLink>
                            <FooterLink href={route('order.track')}>Cek Status</FooterLink>
                        </ul>
                    </div>

                    <div className="lg:col-span-4">
                        <h3 className="text-lg font-bold text-white mb-6 relative inline-block tracking-wide">
                            Hubungi Kami
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#277cdd] rounded-full"></span>
                        </h3>
                        <ul className="space-y-4">
                            {website_config?.address && (
                                <li>
                                    <ContactItem
                                        href={`https://maps.google.com/?q=${encodeURIComponent(website_config.address)}`}
                                        icon={<FaMapMarkerAlt />}
                                        text={website_config.address}
                                    />
                                </li>
                            )}
                            {website_config?.whatsapp && (
                                <li>
                                    <ContactItem
                                        href={`https://wa.me/${website_config.whatsapp.replace(/\D/g,"")}`}
                                        icon={<FaPhoneAlt />}
                                        text={`+${website_config.whatsapp}`}
                                    />
                                </li>
                            )}
                            {website_config?.email && (
                                <li>
                                    <ContactItem
                                        href={`mailto:${website_config.email}`}
                                        icon={<FaEnvelope />}
                                        text={website_config.email}
                                    />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left text-slate-500 text-sm font-medium">
                        <p>
                            © {currentYear} <span className="text-white font-bold">{website_config?.title || 'GR-DOU'}</span>.
                        </p>
                        <p className="mt-1 text-xs font-light opacity-70">
                            All Rights Reserved.
                        </p>
                    </div>

                    {website_config?.address && (
                        <div className="w-full md:w-1/3 h-24 rounded-lg overflow-hidden bg-slate-800 border border-white/10 relative group shadow-lg">
                            <iframe
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(website_config.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="opacity-70 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                            ></iframe>
                            <a 
                                href={`https://maps.google.com/?q=${encodeURIComponent(website_config.address)}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40"
                            >
                                <span className="bg-[#277cdd] px-3 py-1 rounded text-xs text-white font-medium shadow-sm">
                                    Buka Peta
                                </span>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}