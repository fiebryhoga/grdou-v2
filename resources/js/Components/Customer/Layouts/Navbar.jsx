import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { IoIosArrowDown, IoMdClose, IoMdMenu } from "react-icons/io";
import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { useCart } from '@/Contexts/CartContext';

const Navbar = () => {
    const [isPromoVisible, setIsPromoVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { url, props } = usePage();
    
    const { website_config, cart: cartProps } = props; 
    const { cart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const baseLinkClass = "transition duration-300 relative py-2";
    const activeLinkClass = "text-[#277cdd] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#277cdd] after:rounded-full"; 
    const inactiveLinkClass = "text-gray-700 font-medium hover:text-[#277cdd]";

    const isOrderPageActive = url.startsWith("/order");
    const isLayananPageActive = url.startsWith("/produk") || url.startsWith("/katalog");
    const isTentangPageActive = url.startsWith("/tentang-kami");

    const waNumber = website_config?.whatsapp ? website_config.whatsapp.replace(/\D/g, "") : "";
    const waMessage = "Halo, saya ingin mengkonsultasikan tentang pesanan saya...";
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

    return (
        <div className={`sticky top-0 left-0 right-0 z-50 flex flex-col w-full transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'}`}>
            
            {isPromoVisible && website_config?.description && (
                <div className="relative bg-[#277cdd] w-full py-2.5 flex flex-row justify-center items-center text-white text-xs sm:text-sm font-medium px-8 text-center">
                    <p>{website_config.title} - Spesialis Sablon & Konveksi</p>
                    <button
                        onClick={() => setIsPromoVisible(false)}
                        className="absolute right-4 top-0 bottom-0 text-white/80 hover:text-white transition-colors flex items-center"
                    >
                        <IoMdClose size={18} />
                    </button>
                </div>
            )}

            <div className="w-full py-3.5 flex flex-row 2xl:px-64 xl:px-32 lg:px-10 md:px-6 sm:px-4 px-4 justify-between items-center">
                
                <div className="flex flex-row gap-4 items-center w-auto sm:w-3/12">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden text-gray-700 hover:text-[#277cdd] transition-colors"
                    >
                        {isMobileMenuOpen ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
                    </button>

                    <Link href="/">
                        <img
                            className="w-12 sm:w-14 hover:scale-105 transition-transform duration-300"
                            src="/assets/images/home/logo-grdou.png"
                            alt="Logo"
                        />
                    </Link>
                </div>

                <div className="hidden lg:flex flex-row gap-8 text-[15px] items-center">
                    <Link href="/" className={`${baseLinkClass} ${url === "/" ? activeLinkClass : inactiveLinkClass}`}>Beranda</Link>
                    <Link href={route("katalog.index")} className={`${baseLinkClass} ${isLayananPageActive ? activeLinkClass : inactiveLinkClass}`}>Layanan</Link>
                    <Link href={route("tentang.index")} className={`${baseLinkClass} ${isTentangPageActive ? activeLinkClass : inactiveLinkClass}`}>Tentang Kami</Link>

                    <div className="relative group py-2">
                        <button className={`${baseLinkClass} ${isOrderPageActive ? activeLinkClass : inactiveLinkClass} flex flex-row gap-1.5 items-center`}>
                            <span>Order</span>
                            <IoIosArrowDown className="group-hover:rotate-180 transition-transform duration-300"/>
                        </button>

                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-3">
                            <div className="w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden flex flex-col">
                                <Link href={route("order.create")} className={`px-5 py-3 text-sm transition-colors ${url === "/order/create" ? "text-[#277cdd] font-semibold bg-blue-50/50" : "text-gray-600 hover:bg-gray-50 hover:text-[#277cdd]"}`}>Buat Orderan Baru</Link>
                                <Link href={route("order.track")} className={`px-5 py-3 text-sm transition-colors ${url === "/order/track" ? "text-[#277cdd] font-semibold bg-blue-50/50" : "text-gray-600 hover:bg-gray-50 hover:text-[#277cdd]"}`}>Lacak Status Order</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-auto sm:w-3/12 flex flex-row justify-end items-center gap-5">
                    <Link href={route('cart.index')} className="relative p-2 text-gray-600 hover:text-[#277cdd] transition duration-300 transform hover:scale-110">
                        <FaShoppingCart size={22} />
                        {cart && cart.length > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden lg:flex items-center gap-2 bg-[#277cdd] hover:bg-[#1f63b3] text-white font-medium text-sm py-2.5 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <FaWhatsapp size={18} />
                        <span>Konsultasi</span>
                    </a>
                </div>
            </div>

            <div className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-6 py-5 flex flex-col gap-1">
                    <Link href="/" className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${url === "/" ? "bg-blue-50 text-[#277cdd]" : "text-gray-600 hover:bg-gray-50 hover:text-[#277cdd]"}`}>Beranda</Link>
                    <Link href={route('katalog.index')} className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${isLayananPageActive ? "bg-blue-50 text-[#277cdd]" : "text-gray-600 hover:bg-gray-50 hover:text-[#277cdd]"}`}>Layanan</Link>
                    <Link href={route('order.create')} className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${url === "/order/create" ? "bg-blue-50 text-[#277cdd]" : "text-gray-600 hover:bg-gray-50 hover:text-[#277cdd]"}`}>Buat Orderan</Link>
                    <Link href={route('order.track')} className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${url === "/order/track" ? "bg-blue-50 text-[#277cdd]" : "text-gray-600 hover:bg-gray-50 hover:text-[#277cdd]"}`}>Lacak Orderan</Link>
                    <Link href={route('tentang.index')} className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${isTentangPageActive ? "bg-blue-50 text-[#277cdd]" : "text-gray-600 hover:bg-gray-50 hover:text-[#277cdd]"}`}>Tentang Kami</Link>
                    
                    <div className="pt-4 mt-2">
                        <a href={waLink} className="flex items-center justify-center gap-2 w-full bg-[#277cdd] hover:bg-[#1f63b3] text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm">
                            <FaWhatsapp size={20} />
                            <span>Konsultasi via WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;