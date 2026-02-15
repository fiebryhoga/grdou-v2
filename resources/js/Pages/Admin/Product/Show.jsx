import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Edit3, Calendar, Layers, Box, CheckCircle2, Tag } from 'lucide-react';

export default function Show({ auth, product }) {
    // Format Rupiah
    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    // REVISI LOGIKA DISKON:
    // Harga Jual = base_price (100)
    // Harga Coret = discount_price (120)
    const hasDiscount = product.discount_price && product.discount_price > product.base_price;
    
    // Rumus hemat: (120 - 100) / 120 * 100 = 16%
    const discountPercentage = hasDiscount
        ? Math.round(((product.discount_price - product.base_price) / product.discount_price) * 100) 
        : 0;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={product.name} />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <Link href={route('admin.product.index')} className="group flex items-center text-slate-500 text-sm font-medium hover:text-slate-900 transition-colors w-fit">
                        <div className="p-1 rounded-full group-hover:bg-slate-200 mr-2 transition-all">
                            <ChevronLeft size={20} />
                        </div>
                        Kembali ke Katalog
                    </Link>
                    
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${product.is_active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                            {product.is_active ? 'Published' : 'Draft'}
                        </span>
                        <Link 
                            href={route('admin.product.edit', product.id)} 
                            className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all"
                        >
                            <Edit3 size={16} className="mr-2" /> Edit Produk
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* --- LEFT: IMAGES --- */}
                    <div className="lg:col-span-5 space-y-4 sticky top-8">
                        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-square relative group">
                            <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                            
                            {/* Label Hemat di Gambar */}
                            {hasDiscount && (
                                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
                                    Hemat {discountPercentage}%
                                </div>
                            )}
                        </div>

                        {/* Gallery Grid */}
                        {product.images && product.images.length > 0 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.map((img, index) => (
                                    <div key={index} className="aspect-square rounded-lg overflow-hidden border border-slate-200 cursor-pointer hover:opacity-80 transition-opacity">
                                        <img src={typeof img === 'string' ? img : URL.createObjectURL(img)} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                            <Calendar size={14} /> Terakhir update: {formatDate(product.updated_at)}
                        </div>
                    </div>

                    {/* --- RIGHT: DETAILS --- */}
                    <div className="lg:col-span-7 space-y-8">
                        
                        {/* Title & Price Section */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">{product.name}</h1>
                            
                            {/* REVISI TAMPILAN HARGA */}
                            <div className="flex flex-col sm:flex-row sm:items-end gap-3 pb-6 border-b border-slate-100">
                                {/* Harga Jual (Besar) */}
                                <p className="text-4xl font-bold text-slate-900">
                                    {formatIDR(product.base_price)}
                                </p>

                                {/* Harga Coret (Kecil, Dicoret) */}
                                {hasDiscount && (
                                    <div className="flex flex-col mb-1.5">
                                        <span className="text-sm text-slate-400 line-through font-medium">
                                            {formatIDR(product.discount_price)}
                                        </span>
                                        <span className="text-xs text-red-500 font-semibold">
                                            Harga Normal
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                                    <Tag size={16} /> Deskripsi
                                </h3>
                                <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                                    {product.description}
                                </div>
                            </div>
                        </div>

                        {/* Sizes */}
                        {product.available_sizes && product.available_sizes.length > 0 && (
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                                    <Box size={18} className="text-blue-600" /> Ukuran Tersedia
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.available_sizes.map((size, idx) => (
                                        <span key={idx} className="px-4 py-2 bg-slate-50 text-slate-700 font-bold text-sm rounded-lg border border-slate-200">
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Specs (Key-Value) */}
                        {product.specifications && product.specifications.length > 0 && (
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                                    <Layers size={18} className="text-purple-600" /> Spesifikasi
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                    {product.specifications.map((spec, i) => (
                                        <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-2 last:border-0">
                                            <span className="text-sm text-slate-500 font-medium">{spec.key}</span>
                                            <span className="text-sm text-slate-900 font-bold">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add-ons */}
                        {product.addons && product.addons.length > 0 && (
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6 flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-orange-500" /> Opsi Kustomisasi
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {product.addons.map((group, gIdx) => (
                                        <div key={gIdx} className="bg-orange-50/50 rounded-xl p-5 border border-orange-100">
                                            <h4 className="font-bold text-orange-800 text-sm mb-3 pb-2 border-b border-orange-200/50">
                                                {group.title}
                                            </h4>
                                            <ul className="space-y-2">
                                                {group.options.map((opt, oIdx) => (
                                                    <li key={oIdx} className="flex justify-between items-center text-sm">
                                                        <span className="text-slate-700">{opt.name}</span>
                                                        <span className="font-mono text-orange-600 font-semibold bg-white px-2 py-0.5 rounded border border-orange-100 text-xs">
                                                            +{formatIDR(opt.price)}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}