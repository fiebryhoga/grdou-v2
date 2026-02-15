import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { ChevronLeft, Upload, Plus, X, Image as ImageIcon, Trash2, Save } from 'lucide-react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '', 
        description: '', 
        base_price: '', 
        discount_price: '', 
        thumbnail: null, 
        images: [], // Untuk galeri gambar tambahan
        specifications: [{ key: '', value: '' }], // Format Key: Value
        addons: [], 
        available_sizes: [],
        is_active: true
    });

    // --- HANDLERS: IMAGES ---
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData('images', [...data.images, ...files]);
    };

    const removeImage = (index) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData('images', newImages);
    };

    // --- HANDLERS: SIZES ---
    const sizesList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'All Size'];
    const toggleSize = (size) => {
        if (data.available_sizes.includes(size)) {
            setData('available_sizes', data.available_sizes.filter(s => s !== size));
        } else {
            setData('available_sizes', [...data.available_sizes, size]);
        }
    };

    // --- HANDLERS: SPECIFICATIONS ---
    const addSpec = () => setData('specifications', [...data.specifications, { key: '', value: '' }]);
    const removeSpec = (index) => {
        const specs = [...data.specifications];
        specs.splice(index, 1);
        setData('specifications', specs);
    };
    const updateSpec = (index, field, val) => {
        const specs = [...data.specifications];
        specs[index][field] = val;
        setData('specifications', specs);
    };

    // --- HANDLERS: ADDONS ---
    const addAddonGroup = () => setData('addons', [...data.addons, { title: '', options: [{ name: '', price: 0 }] }]);
    const removeAddonGroup = (index) => {
        const addons = [...data.addons];
        addons.splice(index, 1);
        setData('addons', addons);
    };
    const updateAddonGroupTitle = (index, val) => {
        const addons = [...data.addons];
        addons[index].title = val;
        setData('addons', addons);
    };
    
    // Nested Addon Options
    const addAddonOption = (groupIndex) => {
        const addons = [...data.addons];
        addons[groupIndex].options.push({ name: '', price: 0 });
        setData('addons', addons);
    };
    const removeAddonOption = (groupIndex, optionIndex) => {
        const addons = [...data.addons];
        addons[groupIndex].options.splice(optionIndex, 1);
        setData('addons', addons);
    };
    const updateAddonOption = (groupIndex, optionIndex, field, val) => {
        const addons = [...data.addons];
        addons[groupIndex].options[optionIndex][field] = val;
        setData('addons', addons);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.product.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Produk Baru" />
            
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.product.index')} className="p-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-slate-500 hover:text-slate-800">
                            <ChevronLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Buat Produk Baru</h1>
                            <p className="text-slate-500 text-sm">Isi informasi detail produk untuk ditampilkan di katalog.</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* KOLOM KIRI (UTAMA) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* 1. Informasi Dasar */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-blue-600 rounded-full"></span> Informasi Dasar
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Produk</label>
                                    <input type="text" className="w-full rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500" 
                                        placeholder="Contoh: Jaket Bomber Canvas"
                                        value={data.name} onChange={e => setData('name', e.target.value)} 
                                    />
                                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Lengkap</label>
                                    <textarea rows="5" className="w-full rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Jelaskan detail bahan, fitur, dan keunggulan produk..."
                                        value={data.description} onChange={e => setData('description', e.target.value)}
                                    />
                                    {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description}</span>}
                                </div>
                            </div>
                        </div>

                        {/* 2. Spesifikasi Teknis */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-purple-600 rounded-full"></span> Spesifikasi
                                </h2>
                                <button type="button" onClick={addSpec} className="text-blue-600 text-sm font-semibold hover:underline">+ Tambah Specs</button>
                            </div>
                            <div className="space-y-3">
                                {data.specifications.map((spec, index) => (
                                    <div key={index} className="flex gap-3">
                                        <input type="text" placeholder="Label (Misal: Bahan)" className="w-1/3 rounded-xl border-slate-300 text-sm focus:border-purple-500 focus:ring-purple-500"
                                            value={spec.key} onChange={e => updateSpec(index, 'key', e.target.value)} />
                                        <input type="text" placeholder="Nilai (Misal: Cotton Combed 24s)" className="w-full rounded-xl border-slate-300 text-sm focus:border-purple-500 focus:ring-purple-500"
                                            value={spec.value} onChange={e => updateSpec(index, 'value', e.target.value)} />
                                        <button type="button" onClick={() => removeSpec(index)} className="text-slate-400 hover:text-red-500 p-2">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                                {data.specifications.length === 0 && (
                                    <p className="text-slate-400 text-sm italic text-center py-4">Belum ada spesifikasi ditambahkan.</p>
                                )}
                            </div>
                        </div>

                        {/* 3. Add-ons / Kustomisasi */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-orange-500 rounded-full"></span> Add-ons / Opsi Tambahan
                                </h2>
                                <button type="button" onClick={addAddonGroup} className="px-3 py-1.5 bg-orange-50 text-orange-600 text-xs font-bold rounded-lg border border-orange-200 hover:bg-orange-100">+ Grup Baru</button>
                            </div>
                            
                            <div className="space-y-6">
                                {data.addons.map((group, gIndex) => (
                                    <div key={gIndex} className="bg-slate-50 rounded-xl p-4 border border-slate-200 relative group">
                                        <button type="button" onClick={() => removeAddonGroup(gIndex)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
                                            <X size={18} />
                                        </button>
                                        
                                        {/* Nama Grup */}
                                        <div className="mb-4 pr-8">
                                            <label className="text-xs font-bold text-slate-500 uppercase">Nama Grup Opsi</label>
                                            <input type="text" className="block w-full bg-transparent border-0 border-b-2 border-slate-300 focus:border-orange-500 focus:ring-0 px-0 text-slate-900 font-semibold placeholder-slate-400"
                                                placeholder="Misal: Pilihan Lengan, Jenis Sablon"
                                                value={group.title} onChange={e => updateAddonGroupTitle(gIndex, e.target.value)}
                                            />
                                        </div>

                                        {/* Opsi Items */}
                                        <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                                            {group.options.map((option, oIndex) => (
                                                <div key={oIndex} className="flex gap-2 items-center">
                                                    <input type="text" placeholder="Nama Opsi" className="w-full text-sm rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500"
                                                        value={option.name} onChange={e => updateAddonOption(gIndex, oIndex, 'name', e.target.value)} />
                                                    
                                                    <div className="relative w-32">
                                                        <span className="absolute left-3 top-2 text-slate-400 text-xs">Rp</span>
                                                        <input type="number" placeholder="0" className="w-full text-sm pl-8 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500"
                                                            value={option.price} onChange={e => updateAddonOption(gIndex, oIndex, 'price', e.target.value)} />
                                                    </div>
                                                    
                                                    <button type="button" onClick={() => removeAddonOption(gIndex, oIndex)} className="text-slate-400 hover:text-red-500">
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addAddonOption(gIndex)} className="mt-2 text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
                                                <Plus size={14} /> Tambah Opsi
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {data.addons.length === 0 && (
                                    <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                                        <p className="text-slate-500 text-sm">Tidak ada opsi tambahan.</p>
                                        <p className="text-slate-400 text-xs">Gunakan ini untuk variasi berbayar (cth: Lengan Panjang +10k).</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* KOLOM KANAN (SIDEBAR) */}
                    <div className="space-y-8">
                        
                        {/* 4. Status & Publish */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <label className="text-sm font-semibold text-slate-700">Status Produk</label>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs font-bold ${data.is_active ? 'text-green-600' : 'text-slate-500'}`}>
                                        {data.is_active ? 'PUBLISHED' : 'DRAFT'}
                                    </span>
                                    <button 
                                        type="button" 
                                        onClick={() => setData('is_active', !data.is_active)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data.is_active ? 'bg-green-500' : 'bg-slate-300'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>
                            <button disabled={processing} className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                                <Save size={18} />
                                {processing ? 'Menyimpan...' : 'Simpan Produk'}
                            </button>
                        </div>

                        {/* 5. Harga */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Harga</h2>
                            <div className="space-y-4">
                                <div>
                                    {/* INI HARGA YANG DIBAYAR USER */}
                                    <label className="text-xs font-semibold text-slate-900 mb-1 block">Harga Jual (Net)</label>
                                    <input type="number" className="w-full rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500 font-bold text-slate-900"
                                        value={data.base_price} onChange={e => setData('base_price', e.target.value)} placeholder="Contoh: 100000" />
                                    {errors.base_price && <span className="text-red-500 text-xs">{errors.base_price}</span>}
                                </div>
                                <div>
                                    {/* INI HARGA CORET (LEBIH TINGGI) */}
                                    <label className="text-xs font-semibold text-slate-500 mb-1 block">Harga Coret / Markup (Opsional)</label>
                                    <input type="number" className="w-full rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500 text-slate-500"
                                        value={data.discount_price} onChange={e => setData('discount_price', e.target.value)} placeholder="Contoh: 120000" />
                                    <p className="text-[10px] text-slate-400 mt-1">Isi lebih tinggi dari harga jual untuk efek diskon.</p>
                                </div>
                            </div>
                        </div>

                        {/* 6. Media (Thumbnail & Gallery) */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Media</h2>
                            
                            {/* Thumbnail */}
                            <div className="mb-6">
                                <label className="text-xs font-semibold text-slate-500 mb-2 block">Thumbnail Utama *</label>
                                <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors group">
                                    {data.thumbnail ? (
                                        <img src={URL.createObjectURL(data.thumbnail)} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                            <ImageIcon size={32} className="mb-2" />
                                            <span className="text-xs">Upload Utama</span>
                                        </div>
                                    )}
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" 
                                        accept="image/*"
                                        onChange={e => setData('thumbnail', e.target.files[0])} 
                                    />
                                </div>
                                {errors.thumbnail && <span className="text-red-500 text-xs mt-1">{errors.thumbnail}</span>}
                            </div>

                            {/* Gallery Images */}
                            <div>
                                <label className="text-xs font-semibold text-slate-500 mb-2 block">Galeri Tambahan</label>
                                <div className="grid grid-cols-3 gap-2 mb-2">
                                    {data.images.map((file, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                                            <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600">
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    <div className="relative aspect-square rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center hover:bg-slate-50 cursor-pointer">
                                        <Plus size={20} className="text-slate-400" />
                                        <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" 
                                            onChange={handleImageChange} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 7. Ukuran (Sizes) */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Ukuran Tersedia</h2>
                            <div className="flex flex-wrap gap-2">
                                {sizesList.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => toggleSize(size)}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                                            data.available_sizes.includes(size)
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-slate-400 mt-3">Klik untuk memilih ukuran yang tersedia.</p>
                        </div>

                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}