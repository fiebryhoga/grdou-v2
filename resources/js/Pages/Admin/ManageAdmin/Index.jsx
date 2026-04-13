import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { UserPlus, Trash2, ShieldCheck, Edit3, Mail, Lock, User } from 'lucide-react';
import ModalEditUser from '@/Components/Admin/Users/ModalEditUser';
import ConfirmationModal from '@/Components/Admin/Partials/ConfirmationModal';

export default function Index({ auth, admins }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const createForm = useForm({
        name: '',
        email: '',
        password: '',
    });

    const editForm = useForm({
        name: '',
        email: '',
        password: '',
    });

    const handleCreate = (e) => {
        e.preventDefault();
        createForm.post(route('admin.manage.store'), {
            onSuccess: () => createForm.reset(),
        });
    };

    const openEdit = (admin) => {
        setSelectedAdmin(admin);
        editForm.setData({
            name: admin.name,
            email: admin.email,
            password: '',
        });
        setIsEditOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        editForm.put(route('admin.manage.update', selectedAdmin.id), {
            onSuccess: () => setIsEditOpen(false),
        });
    };

    const confirmDelete = (admin) => {
        setSelectedAdmin(admin);
        setIsConfirmOpen(true);
    };

    const handleDelete = () => {
        editForm.delete(route('admin.manage.destroy', selectedAdmin.id), {
            onSuccess: () => setIsConfirmOpen(false),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Manajemen Administrator"
        >
            <Head title="Manajemen Admin | GR-DOU" />

            <div className="max-w-7xl mx-auto p-4 sm:p-8">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    
                    {/* --- FORM TAMBAH ADMIN (Kiri) --- */}
                    <div className="xl:col-span-4">
                        <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-100 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.05)] sticky top-32">
                            
                            <div className="flex items-center gap-4 mb-8 border-b border-slate-50 pb-6">
                                <div className="p-3.5 bg-blue-50 text-[#277cdd] rounded-lg shadow-sm border border-blue-100/50">
                                    <UserPlus size={24} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">Admin Baru</h3>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">Registrasi akun staf sistem</p>
                                </div>
                            </div>

                            <form onSubmit={handleCreate} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 capitalize tracking-wider mb-2 ml-1">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="text-slate-400 group-focus-within:text-[#277cdd] transition-colors" size={16} />
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-lg border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#277cdd] focus:ring-4 focus:ring-[#277cdd]/10 transition-all text-sm font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-medium"
                                            value={createForm.data.name}
                                            onChange={e => createForm.setData('name', e.target.value)}
                                            placeholder="Masukkan nama..."
                                        />
                                    </div>
                                    {createForm.errors.name && <p className="text-red-500 text-[11px] font-bold mt-1.5 ml-1">{createForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 capitalize tracking-wider mb-2 ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="text-slate-400 group-focus-within:text-[#277cdd] transition-colors" size={16} />
                                        </div>
                                        <input
                                            type="email"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-lg border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#277cdd] focus:ring-4 focus:ring-[#277cdd]/10 transition-all text-sm font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-medium"
                                            value={createForm.data.email}
                                            onChange={e => createForm.setData('email', e.target.value)}
                                            placeholder="email@grdou.com"
                                        />
                                    </div>
                                    {createForm.errors.email && <p className="text-red-500 text-[11px] font-bold mt-1.5 ml-1">{createForm.errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 capitalize tracking-wider mb-2 ml-1">
                                        Password Akses
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="text-slate-400 group-focus-within:text-[#277cdd] transition-colors" size={16} />
                                        </div>
                                        <input
                                            type="password"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-lg border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#277cdd] focus:ring-4 focus:ring-[#277cdd]/10 transition-all text-sm font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-medium"
                                            value={createForm.data.password}
                                            onChange={e => createForm.setData('password', e.target.value)}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    {createForm.errors.password && <p className="text-red-500 text-[11px] font-bold mt-1.5 ml-1">{createForm.errors.password}</p>}
                                </div>

                                <div className="pt-2">
                                    <button
                                        disabled={createForm.processing}
                                        className="w-full flex justify-center items-center gap-2 bg-[#277cdd] hover:bg-[#1f63b3] text-white font-bold py-4 rounded-lg shadow-lg shadow-[#277cdd]/30 hover:shadow-xl hover:shadow-[#277cdd]/40 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {createForm.processing ? 'Menyimpan...' : 'Tambahkan Admin'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* --- TABEL DAFTAR ADMIN (Kanan) --- */}
                    <div className="xl:col-span-8">
                        <div className="bg-white rounded-lg border border-slate-100 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-full">
                            
                            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 bg-white">
                                <div>
                                    <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">Daftar Administrator</h3>
                                    <p className="text-sm text-slate-500 font-medium mt-1">Seluruh staf dengan hak akses panel kontrol</p>
                                </div>
                                <span className="px-4 py-2 bg-[#277cdd]/10 text-[#277cdd] text-xs font-bold rounded-full border border-[#277cdd]/20 whitespace-nowrap shadow-sm">
                                    Total {admins.length} Staf
                                </span>
                            </div>

                            <div className="overflow-x-auto w-full">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-[11px] font-bold capitalize tracking-widest">
                                            <th className="px-6 sm:px-8 py-4">Profil Staf</th>
                                            <th className="px-6 sm:px-8 py-4">Otoritas</th>
                                            <th className="px-6 sm:px-8 py-4 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100/80">
                                        {admins.map((admin) => (
                                            <tr key={admin.id} className="hover:bg-slate-50/50 transition-colors duration-200 group">
                                                
                                                <td className="px-6 sm:px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-11 w-11 rounded-[14px] bg-gradient-to-br from-[#277cdd] to-blue-800 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#277cdd]/20 transform group-hover:scale-105 transition-transform duration-300">
                                                            {admin.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900 text-sm tracking-tight mb-0.5">{admin.name}</p>
                                                            <p className="text-slate-500 text-xs font-medium">{admin.email}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 sm:px-8 py-5">
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-lg border border-emerald-100">
                                                        <ShieldCheck size={14} /> Full Access
                                                    </div>
                                                </td>

                                                <td className="px-6 sm:px-8 py-5">
                                                    <div className="flex items-center justify-center gap-2 lg:gap-3">
                                                        <button
                                                            onClick={() => openEdit(admin)}
                                                            title="Edit Data"
                                                            className="p-2.5 text-slate-400 hover:text-[#277cdd] hover:bg-blue-50 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-100"
                                                        >
                                                            <Edit3 size={18} />
                                                        </button>
                                                        
                                                        {/* Cegah admin menghapus dirinya sendiri dengan mematikan tombol delete */}
                                                        {auth.user.id !== admin.id ? (
                                                            <button
                                                                onClick={() => confirmDelete(admin)}
                                                                title="Hapus Staf"
                                                                className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 border border-transparent hover:border-red-100"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        ) : (
                                                            <div className="p-2.5 w-[42px] h-[42px]" title="Anda tidak bisa menghapus akun Anda sendiri"></div>
                                                        )}
                                                    </div>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Empty State jika tidak ada admin (secara teknis tidak mungkin karena minimal ada 1 admin yang sedang login) */}
                            {admins.length === 0 && (
                                <div className="p-12 text-center text-slate-500">
                                    <p>Tidak ada data administrator.</p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODALS --- */}
            <ModalEditUser 
                isOpen={isEditOpen} 
                onClose={() => setIsEditOpen(false)}
                data={editForm.data}
                setData={editForm.setData}
                post={handleUpdate}
                processing={editForm.processing}
                errors={editForm.errors}
            />

            <ConfirmationModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                title="Hapus Administrator"
                message={`Anda yakin ingin menghapus akses akun staf atas nama "${selectedAdmin?.name}" secara permanen?`}
                confirmText="Ya, Hapus Akun"
            />
        </AuthenticatedLayout>
    );
}