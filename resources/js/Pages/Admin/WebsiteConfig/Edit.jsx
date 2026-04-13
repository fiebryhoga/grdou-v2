import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Globe, Mail, AlignLeft, Phone, Instagram, Facebook, Image as ImageIcon, Save, CheckCircle } from 'lucide-react';

export default function Edit({ auth, config }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put', 
        title: config?.title || '',
        description: config?.description || '',
        
        // 4 Keunggulan Dinamis
        keunggulan_1_title: config?.keunggulan_1_title || '',
        keunggulan_1_desc: config?.keunggulan_1_desc || '',
        keunggulan_2_title: config?.keunggulan_2_title || '',
        keunggulan_2_desc: config?.keunggulan_2_desc || '',
        keunggulan_3_title: config?.keunggulan_3_title || '',
        keunggulan_3_desc: config?.keunggulan_3_desc || '',
        keunggulan_4_title: config?.keunggulan_4_title || '',
        keunggulan_4_desc: config?.keunggulan_4_desc || '',
        
        whatsapp: config?.whatsapp || '',
        email: config?.email || '',
        address: config?.address || '',
        youtube: config?.youtube || '',
        facebook: config?.facebook || '',
        instagram: config?.instagram || '',
        client_image_1: null,
        client_image_2: null,
        client_image_3: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.config.update'));
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header="Konfigurasi Website"
        >
            <Head title="Konfigurasi Web | GR-DOU" />

            <div className="w-full p-4 sm:p-6">
                
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800">Pengaturan Profil Website</h2>
                    <p className="text-sm text-slate-500 mt-1">Sesuaikan informasi identitas, keunggulan layanan, kontak, dan portofolio yang akan ditampilkan pada halaman depan.</p>
                </div>

                <form onSubmit={submit} className="space-y-12">
                    
                    {/* --- Section 1: Informasi Dasar --- */}
                    <div>
                        <h3 className="text-base font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                            <Globe size={18} className="text-blue-500" />
                            Informasi Dasar
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Judul Website</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Globe className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                                        placeholder="Contoh: GR-DOU Sablon Konveksi"
                                    />
                                </div>
                                {errors.title && <p className="mt-1 text-sm font-semibold text-red-500">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Email Bisnis</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Mail className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                                        placeholder="admin@grdou.com"
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-sm font-semibold text-red-500">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-semibold text-slate-600 mb-2">Deskripsi Singkat</label>
                            <div className="relative group">
                                <div className="absolute top-3.5 left-3.5 pointer-events-none">
                                    <AlignLeft className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                </div>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows="3"
                                    className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                                    placeholder="Deskripsikan layanan utama Anda di sini..."
                                ></textarea>
                            </div>
                            {errors.description && <p className="mt-1 text-sm font-semibold text-red-500">{errors.description}</p>}
                        </div>
                    </div>

                    {/* --- Section 2: Keunggulan Layanan --- */}
                    <div>
                        <h3 className="text-base font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                            <CheckCircle size={18} className="text-blue-500" />
                            Keunggulan Layanan
                        </h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Loop manual untuk 4 keunggulan agar lebih rapi */}
                            {[1, 2, 3, 4].map((num) => (
                                <div key={num} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm relative">
                                    <span className="absolute -top-3 -left-3 bg-blue-100 text-blue-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold border border-white">
                                        {num}
                                    </span>
                                    <div className="mb-4 mt-2">
                                        <label className="block text-sm font-semibold text-slate-600 mb-1.5">Judul Keunggulan {num}</label>
                                        <input
                                            type="text"
                                            value={data[`keunggulan_${num}_title`]}
                                            onChange={e => setData(`keunggulan_${num}_title`, e.target.value)}
                                            className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:bg-white focus:border-blue-500 transition-all"
                                            placeholder={`Judul keunggulan ke-${num}`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-600 mb-1.5">Deskripsi Singkat</label>
                                        <textarea
                                            value={data[`keunggulan_${num}_desc`]}
                                            onChange={e => setData(`keunggulan_${num}_desc`, e.target.value)}
                                            rows="2"
                                            className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:bg-white focus:border-blue-500 transition-all"
                                            placeholder={`Deskripsi untuk keunggulan ke-${num}`}
                                        ></textarea>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- Section 3: Kontak & Sosial Media --- */}
                    <div>
                        <h3 className="text-base font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                            <Phone size={18} className="text-blue-500" />
                            Kontak & Sosial Media
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Nomor WhatsApp</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Phone className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.whatsapp}
                                        onChange={e => setData('whatsapp', e.target.value)}
                                        className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                                        placeholder="628123456..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Tautan Instagram</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Instagram className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.instagram}
                                        onChange={e => setData('instagram', e.target.value)}
                                        className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Tautan Facebook</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Facebook className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.facebook}
                                        onChange={e => setData('facebook', e.target.value)}
                                        className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                                        placeholder="https://facebook.com/..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Section 4: Gambar Klien (Social Proof) --- */}
                    <div>
                        <h3 className="text-base font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                            <ImageIcon size={18} className="text-blue-500" />
                            Logo Klien Utama
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((num) => (
                                <div key={num} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm relative">
                                    <label className="block text-sm font-semibold text-slate-700 mb-4">Logo Klien {num}</label>
                                    
                                    <div className="flex flex-col gap-4">
                                        <div className="h-24 w-full bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center p-2">
                                            {config && config[`client_image_${num}`] ? (
                                                <img 
                                                    src={`/storage/${config[`client_image_${num}`]}`} 
                                                    alt={`Client ${num}`} 
                                                    className="h-full w-auto object-contain rounded-lg" 
                                                />
                                            ) : (
                                                <div className="text-slate-400 flex flex-col items-center">
                                                    <ImageIcon size={24} />
                                                    <span className="text-xs font-medium mt-1">Belum Ada Logo</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={e => setData(`client_image_${num}`, e.target.files[0])} 
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- Action Buttons --- */}
                    <div className="pt-6 border-t border-slate-200 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={processing} 
                            className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>Menyimpan Data...</>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Simpan Konfigurasi
                                </>
                            )}
                        </button>
                    </div>

                </form>

            </div>
        </AuthenticatedLayout>
    );
}