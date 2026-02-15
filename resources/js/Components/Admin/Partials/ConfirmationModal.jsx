import { X, AlertTriangle } from 'lucide-react';

export default function ConfirmationModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Konfirmasi Aksi", 
    message = "Apakah Anda yakin ingin melanjutkan?", 
    confirmText = "Ya, Lanjutkan",
    type = "danger" // 'danger' atau 'primary'
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl scale-in-center">
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-2xl ${type === 'danger' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                        <AlertTriangle size={24} />
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">{message}</p>

                <div className="flex gap-3">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-4 rounded-2xl font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all text-sm"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={onConfirm}
                        className={`flex-1 py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 text-sm ${
                            type === 'danger' 
                            ? 'bg-red-600 hover:bg-red-700 shadow-red-100' 
                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}