import { Link } from '@inertiajs/react';
import { 
    LayoutDashboard, Shirt, Users, 
    ShoppingCart, ClipboardList, ChevronRight, PackageSearch
} from 'lucide-react';

export default function Sidebar({ isSidebarOpen }) {
    const navigation = [
        { 
            name: 'Dashboard', 
            href: route('dashboard'), 
            icon: LayoutDashboard, 
            active: route().current('dashboard') 
        },
        { 
            name: 'Katalog Produk', // Key Utama
            href: route('admin.product.index'), 
            icon: Shirt, 
            active: route().current('admin.product.*') 
        },
        { 
            name: 'Pesanan Sablon', // Pastikan ini namanya beda
            href: '#', 
            icon: ShoppingCart, 
            active: false 
        },
        { 
            name: 'Manage Admin', 
            href: route('admin.manage.index'), 
            icon: Users, 
            active: route().current('admin.manage.*') 
        },
    ];

    return (
        <aside 
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out transform ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:relative lg:translate-x-0`}
        >
            <div className="flex flex-col h-full">
                {/* Branding - Clean White Background */}
                <div className="h-20 flex items-center px-8 border-b border-slate-50">
                    <img src="/assets/images/layout/logo.png" alt="GR-DOU" className="h-10 w-auto shadow-sm rounded-lg" />
                    <span className="ml-3 font-extrabold text-xl tracking-tight text-slate-900">
                        GR<span className="text-blue-600">-</span>DOU
                    </span>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                    <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
                    
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                                item.active 
                                ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                            }`}
                        >
                            <div className="flex items-center">
                                <item.icon className={`h-5 w-5 mr-3 transition-colors ${
                                    item.active ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'
                                }`} />
                                <span className={`text-sm font-bold ${item.active ? 'text-blue-700' : 'text-slate-600'}`}>
                                    {item.name}
                                </span>
                            </div>
                            {item.active && (
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]"></div>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-6 border-t border-slate-50 bg-slate-50/30">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black italic">
                            GR-DOU System
                        </p>
                        <p className="text-[9px] text-slate-300 mt-1">v1.0.26</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}