import { X, Save } from 'lucide-react';
import { useEffect } from 'react';

export default function ModalEditUser({ isOpen, onClose, user, data, setData, post, processing, errors }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h3 className="text-xl font-black text-slate-900">Edit Admin</h3>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">Update Informasi Akun</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl text-slate-400 shadow-sm border border-transparent hover:border-slate-100 transition-all">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={post} className="p-8 space-y-5">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Nama Lengkap</label>
                        <input
                            type="text"
                            className="w-full mt-1 px-5 py-4 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-bold"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Email Address</label>
                        <input
                            type="email"
                            className="w-full mt-1 px-5 py-4 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-bold"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                    </div>

                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                        <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tight leading-none mb-1">Info Keamanan</p>
                        <p className="text-[11px] text-blue-400 leading-tight italic">Biarkan password kosong jika tidak ingin mengubahnya.</p>
                        <input
                            type="password"
                            className="w-full mt-3 px-5 py-3 rounded-xl border-blue-100 bg-white focus:ring-blue-500 text-sm font-bold placeholder:text-blue-200"
                            placeholder="Ketik password baru..."
                            onChange={e => setData('password', e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 rounded-2xl font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all text-sm"
                        >
                            Batalkan
                        </button>
                        <button 
                            disabled={processing}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 text-sm flex items-center justify-center gap-2"
                        >
                            <Save size={18} /> {processing ? 'Menyimpan...' : 'Update Admin'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}