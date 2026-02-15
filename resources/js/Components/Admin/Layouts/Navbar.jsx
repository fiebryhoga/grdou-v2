import { useState, useEffect, useRef } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Menu, X, LogOut, Bell, User, Settings as SettingsIcon } from 'lucide-react';
import NotificationActivity from '@/Components/Admin/Partials/NotificationActivity';

export default function Navbar({ user, isSidebarOpen, setIsSidebarOpen, header }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const dropdownRef = useRef(null);
    const notifRef = useRef(null);
    const { post } = useForm();
    
    // Gunakan Optional Chaining ?. untuk menghindari error undefined
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
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 z-40 sticky top-0">
            <div className="flex items-center gap-4">
                <button 
                    type="button"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2.5 rounded-xl bg-slate-50 text-slate-600 lg:hidden"
                >
                    {isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}
                </button>
                <div className="hidden lg:block text-slate-800 text-lg font-extrabold uppercase tracking-tight italic">
                    {header ? header : 'GR-DOU Dashboard'}
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* NOTIFICATION */}
                <div className="relative" ref={notifRef}>
                    <button 
                        type="button"
                        onClick={() => setNotifOpen(!notifOpen)}
                        className={`p-2.5 rounded-xl transition-all relative ${notifOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}
                    >
                        <Bell size={20} />
                        {notifications.length > 0 && (
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white shadow-sm"></span>
                        )}
                    </button>

                    {notifOpen && (
                        <div className="absolute right-0 mt-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <NotificationActivity notifications={notifications} />
                        </div>
                    )}
                </div>

                <div className="h-8 w-[1px] bg-slate-100 mx-2 hidden sm:block"></div>

                {/* PROFILE DROPDOWN */}
                <div className="relative" ref={dropdownRef}>
                    <div 
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-100"
                    >
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-bold shadow-md">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-left hidden md:block">
                            <p className="text-sm font-bold text-slate-800 leading-none">{user?.name}</p>
                            <p className="text-[10px] text-slate-400 font-black uppercase mt-1 tracking-tighter italic">Administrator</p>
                        </div>
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-4 py-2 border-b border-slate-50 mb-1 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                                Menu Akun
                            </div>
                            <Link href={route('profile.edit')} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl mx-2 font-bold transition-colors">
                                <User size={16} /> Profil
                            </Link>
                            <button 
                                onClick={(e) => { e.preventDefault(); post(route('logout')); }}
                                className="flex w-[calc(100%-1rem)] items-center gap-3 px-4 py-2 mt-2 text-sm text-red-600 hover:bg-red-50 rounded-xl mx-2 font-black transition-colors"
                            >
                                <LogOut size={16} /> Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}