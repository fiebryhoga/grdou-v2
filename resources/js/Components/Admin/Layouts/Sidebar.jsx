import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Shirt, 
    Users, 
    ShoppingCart, 
    Settings,
    LayoutTemplate
} from 'lucide-react';

export default function Sidebar({ isSidebarOpen }) {
    // Membagi menu menjadi 2 grup agar lebih rapi
    const menuUtama = [
        { 
            name: 'Dashboard', 
            href: route('dashboard'), 
            icon: LayoutDashboard, 
            active: route().current('dashboard') 
        },
        { 
            name: 'Pesanan Masuk', 
            href: route('admin.orders.index'), 
            icon: ShoppingCart, 
            active: route().current('admin.orders.*') 
        },
        { 
            name: 'Katalog Produk', 
            href: route('admin.product.index'), 
            icon: Shirt, 
            active: route().current('admin.product.*') 
        },
    ];

    const menuPengaturan = [
        { 
            name: 'Kelola Admin', 
            href: route('admin.manage.index'), 
            icon: Users, 
            active: route().current('admin.manage.*') 
        },
        { 
            name: 'Konfigurasi Web', 
            href: route('admin.config.edit'), 
            icon: Settings, 
            active: route().current('admin.config.*') 
        },
        { 
            name: 'Konfigurasi About', 
            href: route('admin.about_config.edit'), 
            icon: LayoutTemplate, 
            active: route().current('admin.about_config.*') 
        },
    ];

    const NavItem = ({ item }) => (
        <Link
            href={item.href}
            className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                item.active 
                ? 'bg-[#277cdd]/10 text-[#277cdd] shadow-sm border border-[#277cdd]/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-[#277cdd] border border-transparent'
            }`}
        >
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#277cdd]/0 to-[#277cdd]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="flex items-center relative z-10">
                <div className={`p-1 rounded-lg mr-3 transition-colors duration-300 ${
                    item.active ? 'bg-white shadow-sm text-[#277cdd]' : 'text-slate-400 group-hover:text-[#277cdd] group-hover:bg-blue-50'
                }`}>
                    <item.icon size={16} strokeWidth={item.active ? 2.5 : 2} />
                </div>
                <span className={`text-sm tracking-wide ${item.active ? 'font-extrabold' : 'font-bold'}`}>
                    {item.name}
                </span>
            </div>

            {/* Active Indicator Dot */}
            {item.active && (
                <div className="relative z-10 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#277cdd] opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#277cdd]"></span>
                </div>
            )}
        </Link>
    );

    return (
        <aside 
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/90 backdrop-blur-xl border-r border-slate-100/80 shadow-[10px_0_40px_-10px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out transform ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:relative lg:translate-x-0 flex flex-col h-screen`}
        >
            {/* Branding Header */}
            <div className="h-24 flex items-center px-8 border-b border-slate-100/80 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-blue-50 rounded-full blur-2xl z-0"></div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg shadow-md shadow-blue-900/5 flex items-center justify-center border border-slate-50 p-2">
                        <img 
                            src="/assets/images/home/logo-grdou.png" 
                            alt="Logo" 
                            className="w-full h-full object-contain" 
                            onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=GR&background=277cdd&color=fff"; }}
                        />
                    </div>
                    <div>
                        <h1 className="font-black text-xl tracking-tight text-slate-900 leading-none mb-1">
                            GR<span className="text-[#277cdd]">-</span>DOU
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 capitalize tracking-widest">
                            Admin Panel
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Menus */}
            <nav className="flex-1 px-5 py-8 space-y-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                
                {/* Section: Main Menu */}
                <div>
                    <p className="px-2 text-[10px] font-black text-slate-400 capitalize tracking-widest mb-3">
                        Menu Utama
                    </p>
                    <div className="space-y-1">
                        {menuUtama.map((item) => (
                            <NavItem key={item.name} item={item} />
                        ))}
                    </div>
                </div>

                {/* Section: Settings */}
                <div>
                    <p className="px-2 text-[10px] font-black text-slate-400 capitalize tracking-widest mb-3">
                        Pengaturan & Web
                    </p>
                    <div className="space-y-2">
                        {menuPengaturan.map((item) => (
                            <NavItem key={item.name} item={item} />
                        ))}
                    </div>
                </div>

            </nav>

            {/* Sidebar Footer */}
            <div className="p-6 m-5 bg-slate-50 rounded-lg border border-slate-100 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                    <p className="text-[11px] text-slate-500 capitalize tracking-widest font-black">
                        GR-DOU System
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">
                        Version 2.0.0
                    </p>
                </div>
            </div>
        </aside>
    );
}