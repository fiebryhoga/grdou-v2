import { useState, useEffect, useRef } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Menu, X, LogOut, Bell, User, Home, ChevronRight } from 'lucide-react';
import NotificationActivity from '@/Components/Admin/Partials/NotificationActivity';

export default function Navbar({ user, isSidebarOpen, setIsSidebarOpen, header }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const dropdownRef = useRef(null);
    const notifRef = useRef(null);
    const { post } = useForm();
    
    const notifications = usePage().props.notifications || [];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setDropdownOpen(false);
            if (notifRef.current && !notifRef.current.contains(event.target)) setNotifOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="h-[96px] bg-white/80 backdrop-blur-xl border-b border-slate-100/80 flex items-center justify-between px-6 sm:px-10 z-40 sticky top-0 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.02)]">
            
            <div className="absolute top-0 right-1/4 w-96 h-full bg-[#277cdd]/5 blur-3xl pointer-events-none -z-10"></div>

            <div className="flex items-center gap-5 relative z-10">
                <button 
                    type="button"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-[#277cdd] hover:border-[#277cdd]/30 hover:bg-blue-50 transition-all duration-300 lg:hidden shadow-sm"
                >
                    {isSidebarOpen ? <X size={22}/> : <Menu size={22}/>}
                </button>
                
                <div className="hidden lg:flex items-center gap-3 py-2.5 px-4 bg-slate-50/50 border border-slate-100 rounded-lg transition-all hover:bg-slate-50">
                    <Link href={route('dashboard')} className="p-1.5 rounded-lg bg-white shadow-sm text-[#277cdd] hover:scale-110 transition-transform">
                        <Home size={14} strokeWidth={3} />
                    </Link>
                    <ChevronRight size={12} className="text-slate-300" strokeWidth={3} />
                    <span className="text-[13px] font-black text-slate-900 tracking-tight">
                        {header ? header : 'Dashboard Overview'}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-5 relative z-10">
                
                <div className="relative" ref={notifRef}>
                    <button 
                        type="button"
                        onClick={() => setNotifOpen(!notifOpen)}
                        className={`p-3 rounded-lg transition-all duration-300 relative border ${
                            notifOpen 
                            ? 'bg-[#277cdd]/10 text-[#277cdd] border-[#277cdd]/30 shadow-sm' 
                            : 'bg-white text-slate-400 border-slate-200 hover:text-[#277cdd] hover:bg-blue-50 hover:border-[#277cdd]/20 shadow-sm'
                        }`}
                    >
                        <Bell size={20} strokeWidth={notifOpen ? 2.5 : 2} />
                        {notifications.length > 0 && (
                            <>
                                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-50"></span>
                            </>
                        )}
                    </button>

                    {notifOpen && (
                        <div className="absolute right-0 mt-4 w-80 sm:w-96 bg-white rounded-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 z-50 transform origin-top-right transition-all duration-200 opacity-100 scale-100">
                            <NotificationActivity notifications={notifications} />
                        </div>
                    )}
                </div>

                <div className="h-10 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

                <div className="relative" ref={dropdownRef}>
                    <div 
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={`flex items-center gap-4 p-2 pr-4 rounded-[20px] transition-all duration-300 cursor-pointer border ${
                            dropdownOpen 
                            ? 'bg-slate-50 border-slate-200 shadow-inner' 
                            : 'bg-white border-transparent hover:border-slate-200 hover:shadow-sm'
                        }`}
                    >
                        <div className="h-11 w-11 rounded-[14px] bg-gradient-to-br from-[#277cdd] to-blue-800 text-white flex items-center justify-center font-bold shadow-md shadow-[#277cdd]/30">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-left hidden md:block">
                            <p className="text-sm font-extrabold text-slate-800 leading-none mb-1">
                                {user?.name}
                            </p>
                            <p className="text-[10px] text-[#277cdd] font-bold capitalize tracking-widest bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                                Administrator
                            </p>
                        </div>
                    </div>

                    <div className={`absolute right-0 mt-4 w-64 bg-white/95 backdrop-blur-xl rounded-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 py-3 z-50 transform origin-top-right transition-all duration-200 ${dropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'}`}>
                        
                        <div className="px-5 py-3 border-b border-slate-100 mb-2">
                            <p className="text-[10px] font-black text-slate-400 capitalize tracking-widest mb-1">Signed in as</p>
                            <p className="text-sm font-bold text-slate-900 truncate">{user?.email}</p>
                        </div>

                        <div className="px-2 space-y-1">
                            <Link 
                                href={route('profile.edit')} 
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-[#277cdd]/10 hover:text-[#277cdd] rounded-lg font-bold transition-all duration-200 group"
                            >
                                <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-white text-slate-400 group-hover:text-[#277cdd] transition-colors">
                                    <User size={16} strokeWidth={2.5}/>
                                </div>
                                Pengaturan Akun
                            </Link>
                            
                            <button 
                                onClick={(e) => { e.preventDefault(); post(route('logout')); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 mt-2 text-sm text-red-600 hover:bg-red-50 rounded-lg font-bold transition-all duration-200 group"
                            >
                                <div className="p-1.5 rounded-lg bg-red-50/50 group-hover:bg-white text-red-400 group-hover:text-red-600 transition-colors">
                                    <LogOut size={16} strokeWidth={2.5}/>
                                </div>
                                Keluar Sistem
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </header>
    );
}