import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { UserPlus, Trash2, Mail, ShieldCheck, Edit3 } from 'lucide-react';
import ModalEditUser from '@/Components/Admin/Users/ModalEditUser';
import ConfirmationModal from '@/Components/Admin/Partials/ConfirmationModal';

export default function Index({ auth, admins }) {
    // State untuk Modal
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    // Form Tambah Admin
    const createForm = useForm({
        name: '',
        email: '',
        password: '',
    });

    // Form Edit Admin
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
            header="Manage Administrator"
        >
            <Head title="Manage Admin | GR-DOU" />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* FORM TAMBAH */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-fit sticky top-24">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-100">
                            <UserPlus size={20} />
                        </div>
                        <div>
                            <h3 className="font-black text-slate-900 leading-none">Admin Baru</h3>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Registrasi Akun</p>
                        </div>
                    </div>

                    <form onSubmit={handleCreate} className="space-y-5">
                        <div className="group">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Nama Lengkap</label>
                            <input
                                type="text"
                                className="w-full mt-1 px-5 py-4 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-blue-500 transition-all text-sm font-bold"
                                value={createForm.data.name}
                                onChange={e => createForm.setData('name', e.target.value)}
                                placeholder="Masukkan nama..."
                            />
                            {createForm.errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{createForm.errors.name}</p>}
                        </div>

                        <div className="group">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Email Address</label>
                            <input
                                type="email"
                                className="w-full mt-1 px-5 py-4 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-blue-500 transition-all text-sm font-bold"
                                value={createForm.data.email}
                                onChange={e => createForm.setData('email', e.target.value)}
                                placeholder="email@grdou.com"
                            />
                            {createForm.errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{createForm.errors.email}</p>}
                        </div>

                        <div className="group">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Password</label>
                            <input
                                type="password"
                                className="w-full mt-1 px-5 py-4 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-blue-500 transition-all text-sm font-bold"
                                value={createForm.data.password}
                                onChange={e => createForm.setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                            {createForm.errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold">{createForm.errors.password}</p>}
                        </div>

                        <button
                            disabled={createForm.processing}
                            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-[1.5rem] shadow-xl transition-all active:scale-95 text-xs uppercase tracking-[0.2em]"
                        >
                            {createForm.processing ? 'Proses...' : 'Simpan Data'}
                        </button>
                    </form>
                </div>

                {/* TABEL DAFTAR */}
                <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                        <h3 className="font-black text-slate-900 italic">GR-DOU ADMIN TEAM</h3>
                        <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-tighter">
                            Total {admins.length} Personel
                        </span>
                    </div>

                    <div className="overflow-x-auto overflow-y-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50/50 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em]">
                                <tr>
                                    <th className="px-8 py-5 text-left">Identitas Admin</th>
                                    <th className="px-8 py-5 text-left">Level</th>
                                    <th className="px-8 py-5 text-center">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {admins.map((admin) => (
                                    <tr key={admin.id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 flex items-center justify-center font-black text-lg group-hover:from-blue-600 group-hover:to-blue-800 group-hover:text-white transition-all duration-300">
                                                    {admin.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 tracking-tight">{admin.name}</p>
                                                    <p className="text-slate-400 text-xs font-bold">{admin.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center lg:text-left">
                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase rounded-lg border border-emerald-100 inline-flex items-center gap-1">
                                                <ShieldCheck size={10} /> Authorized
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => openEdit(admin)}
                                                    className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(admin)}
                                                    className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            

            {/* Ganti bagian ini di baris sekitar 198 */}
            <ModalEditUser 
                isOpen={isEditOpen} 
                onClose={() => setIsEditOpen(false)}
                data={editForm.data}
                setData={editForm.setData}
                post={handleUpdate}
                processing={editForm.processing}
                errors={editForm.errors} // <-- Tadi saya tulis editErrors, seharusnya editForm.errors
            />

            <ConfirmationModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                title="Hapus Administrator"
                message={`Akun ${selectedAdmin?.name} akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`}
                confirmText="Hapus Sekarang"
            />
        </AuthenticatedLayout>
    );
}