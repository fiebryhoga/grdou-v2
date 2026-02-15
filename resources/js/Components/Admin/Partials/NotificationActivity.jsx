import { Link } from '@inertiajs/react';
import { Bell, Info, UserPlus, Trash2, Edit3, Clock } from 'lucide-react';

export default function NotificationActivity({ notifications = [] }) {
    const getIcon = (type) => {
        switch (type) {
            case 'create': return <UserPlus className="text-emerald-500" size={16} />;
            case 'delete': return <Trash2 className="text-red-500" size={16} />;
            case 'edit': return <Edit3 className="text-blue-500" size={16} />;
            default: return <Info className="text-slate-400" size={16} />;
        }
    };

    return (
        <div className="w-80 max-h-[400px] overflow-y-auto custom-scrollbar bg-white rounded-2xl shadow-2xl border border-slate-100 py-2">
            <div className="px-4 py-2 border-b border-slate-50 mb-2 flex justify-between items-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aktivitas Terbaru</p>
                <Bell size={12} className="text-blue-500" />
            </div>

            {notifications.length === 0 ? (
                <div className="p-8 text-center">
                    <p className="text-xs text-slate-400 italic">Belum ada aktivitas.</p>
                </div>
            ) : (
                notifications.map((notif, idx) => {
                    const Content = (
                        <div className="flex gap-3 p-3 hover:bg-slate-50 rounded-xl mx-2 transition-colors cursor-pointer group">
                            <div className="mt-1 shrink-0">{getIcon(notif.type)}</div>
                            <div className="min-w-0">
                                <p className="text-[13px] font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                                    {notif.user_name}
                                </p>
                                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{notif.message}</p>
                                <div className="flex items-center gap-1 mt-1 text-[9px] font-bold text-slate-300 uppercase tracking-tighter">
                                    <Clock size={10} /> {notif.time}
                                </div>
                            </div>
                        </div>
                    );

                    return notif.path ? (
                        <Link key={idx} href={notif.path}>{Content}</Link>
                    ) : (
                        <div key={idx}>{Content}</div>
                    );
                })
            )}
        </div>
    );
}