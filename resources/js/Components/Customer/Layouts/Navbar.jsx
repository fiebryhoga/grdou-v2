import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { IoIosArrowDown, IoMdClose, IoMdMenu } from "react-icons/io";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";
// PENTING: Import Context Cart
import { useCart } from '@/Contexts/CartContext';

const Navbar = () => {
    const [isPromoVisible, setIsPromoVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // PENTING: Ambil data cart dari Context
    const { cart } = useCart();

    const { url } = usePage();

    const navLinkClass = (path) =>
        `text-sm font-medium transition-colors duration-200 ${
            url.startsWith(path)
                ? "text-blue-600 font-bold"
                : "text-slate-600 hover:text-blue-600"
        }`;

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all duration-300">
            
            {/* --- Top Promo Bar --- */}
            {isPromoVisible && (
                <div className="bg-blue-600 text-white px-4 py-2 relative flex justify-center items-center text-xs sm:text-sm font-medium">
                    <p className="text-center pr-8">
                        🎉 Promo Spesial: Gratis Ongkir untuk pemesanan di atas 100 pcs!
                    </p>
                    <button
                        onClick={() => setIsPromoVisible(false)}
                        className="absolute right-2 p-1 hover:bg-white/20 rounded-full transition"
                    >
                        <IoMdClose size={16} />
                    </button>
                </div>
            )}

            {/* --- Main Navbar Content --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Logo Area */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link href="/">
                            <img 
                                src="/assets/images/logo.png" 
                                alt="GR-DOU Logo" 
                                className="h-10 w-auto object-contain"
                                onError={(e) => { e.target.style.display='none'; }} 
                            />
                            <span className="text-xl font-bold text-slate-900 tracking-tight ml-2">GR-DOU</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className={navLinkClass("/")}>Beranda</Link>
                        
                        {/* Dropdown Layanan */}
                        <div className="relative group h-full flex items-center">
                            <button className={`flex items-center gap-1 ${navLinkClass("/katalog")}`}>
                                Layanan <IoIosArrowDown className="group-hover:rotate-180 transition-transform duration-200" />
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 w-48 overflow-hidden">
                                    <Link href={route('order.create')} className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600">
                                        Buat Pesanan Baru
                                    </Link>
                                    <Link href={route('katalog.index')} className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600">
                                        Katalog Produk
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link href={route('tentang.index')} className={navLinkClass("/tentang-kami")}>Tentang Kami</Link>
                        <Link href={route('galeri.index')} className={navLinkClass("/galeri")}>Galeri</Link>

                        {/* ICON KERANJANG (DESKTOP) */}
                        <Link href={route('cart.index')} className="relative p-2 text-slate-600 hover:text-blue-600 transition">
                            <FaShoppingCart size={20} />
                            {/* Menampilkan Badge jika cart > 0 */}
                            {cart && cart.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* CTA Button (Desktop) */}
                    <div className="hidden md:flex items-center">
                        <a
                            href="https://wa.me/6281234567890" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <FaWhatsapp size={18} />
                            Hubungi Kami
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        {/* Cart Icon Mobile */}
                        <Link href={route('cart.index')} className="relative text-slate-600">
                             <FaShoppingCart size={24} />
                             {cart && cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            {isMobileMenuOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu (Dropdown) --- */}
            <div className={`md:hidden bg-white border-t border-slate-100 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                    <Link href="/" className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Beranda</Link>
                    <Link href={route('katalog.index')} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Katalog Produk</Link>
                    <Link href={route('order.create')} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Buat Pesanan</Link>
                    <Link href={route('tentang.index')} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Tentang Kami</Link>
                    <Link href={route('galeri.index')} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Galeri</Link>
                    
                    <div className="pt-4 mt-2 border-t border-slate-100">
                        <a href="https://wa.me/6281234567890" className="w-full flex justify-center items-center gap-2 bg-green-500 text-white font-bold py-3 rounded-xl">
                            <FaWhatsapp size={20} /> Chat WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;