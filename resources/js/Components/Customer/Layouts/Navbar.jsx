import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

// Import Ikon
import { IoIosArrowDown } from "react-icons/io";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

// PENTING: Import Context Cart
import { useCart } from '@/Contexts/CartContext';

const Navbar = () => {
    // State
    const [isPromoVisible, setIsPromoVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Ambil data global & Cart
    const { url, props } = usePage();
    const { heroSettings, kontak } = props;
    const { cart } = useCart(); // Data keranjang

    // --- Definisikan Link Kelas (Sesuai Desain Baru) ---
    const baseLinkClass = "transition duration-300";
    const activeLinkClass = "text-blue-600 font-bold"; 
    const inactiveLinkClass = "text-black font-medium hover:text-blue-600";

    // --- Cek Status Halaman Aktif ---
    const isOrderPageActive = url.startsWith("/order");
    // Cek URL /produk atau /katalog
    const isLayananPageActive = url.startsWith("/produk") || url.startsWith("/katalog");
    const isTentangPageActive = url.startsWith("/tentang-kami");

    // --- Logic Link WhatsApp ---
    const waNumber = kontak?.nomor_wa ? kontak.nomor_wa.replace(/\D/g, "") : "";
    const waMessage = "Halo, saya ingin konsultasi pesanan.";
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

    return (
        <div className="sticky top-0 left-0 right-0 z-50 flex flex-col w-full bg-white shadow-md transition-all duration-300">
            
            {/* --- Bar Promosi Dinamis --- */}
            {isPromoVisible && heroSettings?.promo_bar_text && (
                <div className="relative bg-[#277cdd] w-full py-3 sm:py-4 flex flex-row justify-center items-center text-white text-xs sm:text-sm font-medium px-8 text-center">
                    <p>{heroSettings.promo_bar_text}</p>
                    <button
                        onClick={() => setIsPromoVisible(false)}
                        className="absolute right-2 top-0 bottom-0 px-4 text-white/70 hover:text-white transition-colors flex items-center"
                        aria-label="Tutup promosi"
                    >
                        <IoMdClose size={20} />
                    </button>
                </div>
            )}

            {/* --- Navbar Utama --- */}
            <div className="w-full py-3 flex flex-row 2xl:px-64 xl:px-32 lg:px-10 md:px-6 sm:px-4 justify-between items-center bg-white">
                
                {/* 1. Logo & Mobile Toggle */}
                <div className="flex flex-row gap-4 items-center w-auto sm:w-3/12">
                    {/* Tombol Mobile Menu (Hanya muncul di HP) */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden text-black hover:text-[#277cdd] transition-colors"
                    >
                        {isMobileMenuOpen ? <IoMdClose size={26} /> : <IoMdMenu size={26} />}
                    </button>

                    <Link href="/">
                        <img
                            className="w-10 sm:w-14 hover:opacity-80 transition-opacity"
                            src="/assets/images/home/logo-grdou.png"
                            alt="Logo Sablon"
                        />
                    </Link>
                </div>

                {/* 2. Menu Navigasi (Desktop) */}
                <div className="hidden lg:flex flex-row gap-8 text-sm items-center text-black font-medium">
                    <Link
                        href="/"
                        className={`${baseLinkClass} ${url === "/" ? activeLinkClass : inactiveLinkClass}`}
                    >
                        Beranda
                    </Link>

                    {/* PERBAIKAN DI SINI: ganti 'produk.index' jadi 'katalog.index' */}
                    <Link
                        href={route("katalog.index")}
                        className={`${baseLinkClass} ${isLayananPageActive ? activeLinkClass : inactiveLinkClass}`}
                    >
                        Layanan
                    </Link>

                    <Link
                        href={route("tentang.index")}
                        className={`${baseLinkClass} ${isTentangPageActive ? activeLinkClass : inactiveLinkClass}`}
                    >
                        Tentang Kami
                    </Link>

                    

                    {/* Menu Order Dropdown */}
                    <div className="relative group py-2">
                        <button
                            className={`${baseLinkClass} ${isOrderPageActive ? activeLinkClass : inactiveLinkClass} flex flex-row gap-1 items-center`}
                        >
                            <p>Order</p>
                            <IoIosArrowDown className="group-hover:rotate-180 transition-transform duration-300"/>
                        </button>

                        {/* Dropdown Content */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2">
                            <div className="w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-2 overflow-hidden">
                                <Link
                                    href={route("order.create")}
                                    className={`block w-full px-4 py-3 text-sm ${url === "/order/create" ? "text-[#277cdd] font-bold bg-blue-50" : "text-gray-700"} hover:bg-gray-50 hover:text-[#277cdd] transition-colors`}
                                >
                                    Buat Orderan
                                </Link>
                                <Link
                                    href={route("order.track")}
                                    className={`block w-full px-4 py-3 text-sm ${url === "/order/track" ? "text-[#277cdd] font-bold bg-blue-50" : "text-gray-700"} hover:bg-gray-50 hover:text-[#277cdd] transition-colors`}
                                >
                                    Lacak Orderan
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Tombol CTA & Cart */}
                <div className="w-auto sm:w-3/12 flex flex-row justify-end items-center gap-4">
                    
                    {/* ICON KERANJANG */}
                    <Link 
                        href={route('cart.index')} 
                        className="relative p-2 text-slate-600 hover:text-[#277cdd] transition duration-300"
                    >
                        <FaShoppingCart size={22} />
                        {/* Badge Cart - */}
                        {cart && cart.length > 0 && (
                            <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    {/* Tombol Konsultasi */}
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-block bg-[#277cdd] hover:bg-[#025fc9] text-white font-medium text-sm py-2.5 px-5 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Konsultasi Pesanan
                    </a>
                </div>
            </div>

            {/* --- Mobile Menu Drawer --- */}
            <div className={`lg:hidden bg-white border-t border-slate-100 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-6 py-4 space-y-3 flex flex-col">
                    <Link href="/" className="block py-2 text-base font-medium text-slate-700 hover:text-[#277cdd]">Beranda</Link>
                    
                    {/* PERBAIKAN DI SINI JUGA: ganti 'produk.index' jadi 'katalog.index' */}
                    <Link href={route('katalog.index')} className="block py-2 text-base font-medium text-slate-700 hover:text-[#277cdd]">Layanan</Link>
                    
                    <Link href={route('order.create')} className="block py-2 text-base font-medium text-slate-700 hover:text-[#277cdd]">Buat Orderan</Link>
                    <Link href={route('order.track')} className="block py-2 text-base font-medium text-slate-700 hover:text-[#277cdd]">Lacak Orderan</Link>
                    <Link href={route('tentang.index')} className="block py-2 text-base font-medium text-slate-700 hover:text-[#277cdd]">Tentang Kami</Link>
                    
                    <div className="pt-2 border-t border-slate-100 mt-2">
                        <a href={waLink} className="block w-full text-center bg-[#277cdd] text-white font-bold py-3 rounded-lg">
                            Konsultasi via WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;