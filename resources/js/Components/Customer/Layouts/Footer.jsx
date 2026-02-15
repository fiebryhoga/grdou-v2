import React from "react";
import { Link } from "@inertiajs/react";
import { FaInstagram, FaFacebookF, FaTiktok, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white font-bold text-2xl">
                            <img src="/assets/images/logo-white.png" alt="" className="h-8 w-auto" onError={(e) => e.target.style.display='none'} />
                            <span>GR-DOU</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Jasa konveksi dan sablon profesional dengan kualitas terbaik. Menerima pesanan partai besar maupun satuan dengan hasil presisi dan tepat waktu.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><FaInstagram /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><FaFacebookF /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><FaTiktok /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Navigasi</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Beranda</Link></li>
                            <li><Link href={route('checkout.form')} className="hover:text-blue-400 transition-colors">Buat Pesanan</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Portofolio</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Tentang Kami</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Syarat & Ketentuan</Link></li>
                        </ul>
                    </div>

                    {/* Layanan */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Layanan Kami</h3>
                        <ul className="space-y-3 text-sm">
                            <li>Sablon Kaos Plastisol</li>
                            <li>Pembuatan Jersey Full Printing</li>
                            <li>Konveksi Seragam Kerja</li>
                            <li>Jaket & Hoodie Komunitas</li>
                            <li>Merchandise Event</li>
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Hubungi Kami</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 text-blue-500 shrink-0" />
                                <span>Jl. Raya Sukodadi - Karanggeneng, Lamongan, Jawa Timur</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-blue-500 shrink-0" />
                                <span>+62 812-3456-7890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-blue-500 shrink-0" />
                                <span>info@grdou-konveksi.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} GR-DOU Konveksi. All rights reserved.</p>
                    <p>Designed with ❤️ in Lamongan.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;