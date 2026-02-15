import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { ChevronLeft, Upload, Plus, X, Image as ImageIcon, Trash2, Save, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Edit({ auth, product }) {
    // State lokal untuk mengatur tampilan gambar yang SUDAH ADA di database
    // Asumsi: product.images adalah array URL string ['http://...', 'http://...']
    const [existingImages, setExistingImages] = useState(product.images || []);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: product.name,
        description: product.description,
        base_price: product.base_price,
        discount_price: product.discount_price,
        
        thumbnail: null, // File baru untuk thumbnail
        
        images: [], // Array File untuk gambar BARU (Upload tambahan)
        deleted_images: [], // Array URL/Path untuk gambar LAMA yang dihapus
        
        specifications: product.specifications || [{ key: '', value: '' }],
        addons: product.addons || [],
        available_sizes: product.available_sizes || [],
        is_active: Boolean(product.is_active)
    });

    // --- HANDLERS: IMAGES (Complex Logic for Edit) ---
    
    // 1. Handle Gambar BARU (Upload)
    const handleNewImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData('images', [...data.images, ...files]);
    };

    // 2. Hapus Gambar BARU (Belum disimpan ke DB)
    const removeNewImage = (index) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData('images', newImages);
    };

    // 3. Hapus Gambar LAMA (Sudah ada di DB)
    const removeExistingImage = (imageUrl, index) => {
        // Hapus dari tampilan lokal
        const currentExisting = [...existingImages];
        currentExisting.splice(index, 1);
        setExistingImages(currentExisting);

        // Masukkan ke daftar hapus agar Backend tahu
        setData('deleted_images', [...data.deleted_images, imageUrl]);
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
        post(route('admin.product.update', product.id), {
            forceFormData: true, // WAJIB: Agar file upload terbaca
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Edit ${product.name}`} />
            
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.product.index')} className="p-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-slate-500 hover:text-slate-800">
                            <ChevronLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Edit Produk</h1>
                            <p className="text-slate-500 text-sm flex items-center gap-2">
                                ID: <span className="font-mono bg-slate-200 px-1.5 rounded text-xs">{product.id}</span>
                            </p>
                        </div>
                    </div>
                    {/* Delete Shortcut */}
                    <button 
                        onClick={() => {
                            if(confirm('Hapus produk ini permanen?')) {
                                router.delete(route('admin.product.destroy', product.id));
                            }
                        }}
                        className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        Hapus Produk
                    </button>
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
                                        value={data.name} onChange={e => setData('name', e.target.value)} 
                                    />
                                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Lengkap</label>
                                    <textarea rows="5" className="w-full rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                        value={data.description} onChange={e => setData('description', e.target.value)}
                                    />
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
                                        <input type="text" placeholder="Label" className="w-1/3 rounded-xl border-slate-300 text-sm focus:border-purple-500 focus:ring-purple-500"
                                            value={spec.key} onChange={e => updateSpec(index, 'key', e.target.value)} />
                                        <input type="text" placeholder="Nilai" className="w-full rounded-xl border-slate-300 text-sm focus:border-purple-500 focus:ring-purple-500"
                                            value={spec.value} onChange={e => updateSpec(index, 'value', e.target.value)} />
                                        <button type="button" onClick={() => removeSpec(index)} className="text-slate-400 hover:text-red-500 p-2">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Add-ons */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-orange-500 rounded-full"></span> Add-ons
                                </h2>
                                <button type="button" onClick={addAddonGroup} className="px-3 py-1.5 bg-orange-50 text-orange-600 text-xs font-bold rounded-lg border border-orange-200 hover:bg-orange-100">+ Grup Baru</button>
                            </div>
                            
                            <div className="space-y-6">
                                {data.addons.map((group, gIndex) => (
                                    <div key={gIndex} className="bg-slate-50 rounded-xl p-4 border border-slate-200 relative group">
                                        <button type="button" onClick={() => removeAddonGroup(gIndex)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
                                            <X size={18} />
                                        </button>
                                        
                                        <div className="mb-4 pr-8">
                                            <label className="text-xs font-bold text-slate-500 uppercase">Nama Grup</label>
                                            <input type="text" className="block w-full bg-transparent border-0 border-b-2 border-slate-300 focus:border-orange-500 focus:ring-0 px-0 text-slate-900 font-semibold"
                                                value={group.title} onChange={e => updateAddonGroupTitle(gIndex, e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                                            {group.options.map((option, oIndex) => (
                                                <div key={oIndex} className="flex gap-2 items-center">
                                                    <input type="text" placeholder="Opsi" className="w-full text-sm rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500"
                                                        value={option.name} onChange={e => updateAddonOption(gIndex, oIndex, 'name', e.target.value)} />
                                                    <input type="number" placeholder="Harga" className="w-32 text-sm rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500"
                                                        value={option.price} onChange={e => updateAddonOption(gIndex, oIndex, 'price', e.target.value)} />
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
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN (SIDEBAR) */}
                    <div className="space-y-8">
                        
                        {/* 4. Status */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <label className="text-sm font-semibold text-slate-700">Status</label>
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
                            <button disabled={processing} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                <Save size={18} />
                                {processing ? 'Menyimpan...' : 'Update Produk'}
                            </button>
                        </div>

                        {/* 5. Harga */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Harga</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-900 mb-1 block">Harga Jual (Net)</label>
                                    <input type="number" className="w-full rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500 font-bold text-slate-900"
                                        value={data.base_price} onChange={e => setData('base_price', e.target.value)} />
                                    {errors.base_price && <span className="text-red-500 text-xs">{errors.base_price}</span>}
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 mb-1 block">Harga Coret (Opsional)</label>
                                    <input type="number" className="w-full rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500 text-slate-500"
                                        value={data.discount_price} onChange={e => setData('discount_price', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* 6. Media (Thumbnail & Gallery) */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Media</h2>
                            
                            {/* THUMBNAIL */}
                            <div className="mb-6">
                                <label className="text-xs font-semibold text-slate-500 mb-2 block">Thumbnail Utama</label>
                                <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors group cursor-pointer">
                                    {data.thumbnail ? (
                                        <img src={URL.createObjectURL(data.thumbnail)} className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={product.thumbnail} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-white text-xs font-bold flex items-center gap-1">
                                            <Upload size={14} /> Ubah
                                        </p>
                                    </div>
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*"
                                        onChange={e => setData('thumbnail', e.target.files[0])} 
                                    />
                                </div>
                                {errors.thumbnail && <span className="text-red-500 text-xs mt-1">{errors.thumbnail}</span>}
                            </div>

                            {/* GALERI GAMBAR TAMBAHAN (UPDATED) */}
                            <div>
                                <label className="text-xs font-semibold text-slate-500 mb-2 block">Galeri Tambahan</label>
                                <div className="grid grid-cols-3 gap-2 mb-2">
                                    
                                    {/* 1. Gambar Lama (Existing) */}
                                    {existingImages.map((url, idx) => (
                                        <div key={`old-${idx}`} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                                            <img src={url} className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => removeExistingImage(url, idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600 transition-colors">
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}

                                    {/* 2. Gambar Baru (New Upload) */}
                                    {data.images.map((file, idx) => (
                                        <div key={`new-${idx}`} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                                            <img src={URL.createObjectURL(file)} className="w-full h-full object-cover opacity-80" />
                                            {/* Badge NEW */}
                                            <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-tl-lg">NEW</span>
                                            
                                            <button type="button" onClick={() => removeNewImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600 transition-colors">
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Tombol Add */}
                                    <div className="relative aspect-square rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center hover:bg-slate-50 cursor-pointer transition-colors">
                                        <Plus size={20} className="text-slate-400" />
                                        <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" 
                                            onChange={handleNewImageChange} />
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400">Total: {existingImages.length + data.images.length} Gambar</p>
                            </div>
                        </div>

                        {/* 7. Ukuran */}
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
                        </div>

                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}