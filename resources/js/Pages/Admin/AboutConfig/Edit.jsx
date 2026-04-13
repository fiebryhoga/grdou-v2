import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BookOpen, Target, BarChart, Image as ImageIcon, Save } from 'lucide-react';

export default function Edit({ auth, config }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        hero_title: config?.hero_title || '',
        hero_subtitle: config?.hero_subtitle || '',
        story_title: config?.story_title || '',
        story_text: config?.story_text || '',
        vision_text: config?.vision_text || '',
        stat_years: config?.stat_years || '',
        stat_clients: config?.stat_clients || '',
        stat_products: config?.stat_products || '',
        stat_satisfaction: config?.stat_satisfaction || '',
        workshop_image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.about_config.update'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Konfigurasi Halaman Tentang">
            <Head title="Konfigurasi Tentang | GR-DOU" />

            <div className="max-w-7xl mx-auto p-4 sm:p-6">
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8">
                    
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-800">Pengaturan Konten Tentang Kami</h2>
                        <p className="text-sm text-slate-500 mt-1">Kelola narasi, visi misi, statistik perusahaan, dan gambar workshop Anda.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-10">
                        
                        {/* --- Section: Hero & Visi --- */}
                        <div>
                            <h3 className="text-base font-semibold text-slate-700 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                                <Target size={18} className="text-blue-500" />
                                Header Utama & Visi
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">Judul Utama (Hero)</label>
                                    <input
                                        type="text"
                                        value={data.hero_title}
                                        onChange={e => setData('hero_title', e.target.value)}
                                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">Visi Perusahaan</label>
                                    <input
                                        type="text"
                                        value={data.vision_text}
                                        onChange={e => setData('vision_text', e.target.value)}
                                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-6">
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Sub-judul Utama</label>
                                <textarea
                                    value={data.hero_subtitle}
                                    onChange={e => setData('hero_subtitle', e.target.value)}
                                    rows="2"
                                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                ></textarea>
                            </div>
                        </div>

                        {/* --- Section: Cerita Perusahaan --- */}
                        <div>
                            <h3 className="text-base font-semibold text-slate-700 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                                <BookOpen size={18} className="text-blue-500" />
                                Cerita & Perjalanan Kami
                            </h3>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Judul Cerita</label>
                                <input
                                    type="text"
                                    value={data.story_title}
                                    onChange={e => setData('story_title', e.target.value)}
                                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Isi Cerita (Gunakan Enter untuk paragraf baru)</label>
                                <textarea
                                    value={data.story_text}
                                    onChange={e => setData('story_text', e.target.value)}
                                    rows="6"
                                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                ></textarea>
                            </div>
                        </div>

                        {/* --- Section: Statistik --- */}
                        <div>
                            <h3 className="text-base font-semibold text-slate-700 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                                <BarChart size={18} className="text-blue-500" />
                                Data Pencapaian
                            </h3>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">Pengalaman</label>
                                    <input
                                        type="text"
                                        value={data.stat_years}
                                        onChange={e => setData('stat_years', e.target.value)}
                                        placeholder="Contoh: 5+"
                                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:bg-white focus:border-blue-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">Total Klien</label>
                                    <input
                                        type="text"
                                        value={data.stat_clients}
                                        onChange={e => setData('stat_clients', e.target.value)}
                                        placeholder="Contoh: 200+"
                                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:bg-white focus:border-blue-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">Produk Terjual</label>
                                    <input
                                        type="text"
                                        value={data.stat_products}
                                        onChange={e => setData('stat_products', e.target.value)}
                                        placeholder="Contoh: 50K+"
                                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:bg-white focus:border-blue-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">Kepuasan</label>
                                    <input
                                        type="text"
                                        value={data.stat_satisfaction}
                                        onChange={e => setData('stat_satisfaction', e.target.value)}
                                        placeholder="Contoh: 100%"
                                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:bg-white focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* --- Section: Gambar Workshop --- */}
                        <div>
                            <h3 className="text-base font-semibold text-slate-700 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                                <ImageIcon size={18} className="text-blue-500" />
                                Gambar Ruang Kerja
                            </h3>
                            
                            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    <div className="h-32 w-48 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-2 shadow-sm flex-shrink-0">
                                        {config && config.workshop_image ? (
                                            <img 
                                                src={`/storage/${config.workshop_image}`} 
                                                alt="Workshop" 
                                                className="h-full w-full object-cover rounded-lg" 
                                            />
                                        ) : (
                                            <div className="text-slate-400 flex flex-col items-center">
                                                <ImageIcon size={24} />
                                                <span className="text-xs font-medium mt-1">Belum Ada Gambar</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="w-full">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Foto Workshop Baru</label>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={e => setData('workshop_image', e.target.files[0])} 
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                        />
                                        <p className="text-xs text-slate-500 mt-2">Disarankan menggunakan gambar landscape (rasio 4:3) dengan resolusi yang jelas.</p>
                                    </div>
                                </div>
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
            </div>
        </AuthenticatedLayout>
    );
}