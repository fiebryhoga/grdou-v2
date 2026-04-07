import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useCart } from '@/Contexts/CartContext';
import { 
    FaShoppingCart, FaCheck, FaInfoCircle, FaPlus, 
    FaMinus, FaRulerCombined, FaImage, FaTrash, FaSave 
} from 'react-icons/fa';

export default function Show({ product }) {
    const { addToCart, editItemData, setItemToEdit } = useCart(); 
    
    // --- STATE MANAGEMENT ---
    
    // 1. Size Quantities (Pastikan aman jika available_sizes kosong/null)
    const [sizeQuantities, setSizeQuantities] = useState(() => {
        const initial = {};
        if (product.available_sizes && Array.isArray(product.available_sizes)) {
            product.available_sizes.forEach(size => initial[size] = 0);
        }
        return initial;
    });

    const [totalQty, setTotalQty] = useState(0);
    const [designFiles, setDesignFiles] = useState([]); 
    const [mainImage, setMainImage] = useState(product.thumbnail); 
    const [selectedAddons, setSelectedAddons] = useState({});
    const [unitPrice, setUnitPrice] = useState(parseFloat(product.base_price));

    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);

    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

    // --- EFFECT: LOAD DATA EDIT (JIKA ADA) ---
    useEffect(() => {
        if (editItemData && editItemData.id === product.id) {
            setIsEditing(true);
            setEditIndex(editItemData.indexInCart);

            // 1. Restore Sizes
            if (editItemData.variant?.sizes) {
                setSizeQuantities(prev => ({
                    ...prev,
                    ...editItemData.variant.sizes
                }));
            }

            // 2. Restore Addons
            if (editItemData.variant?.addons && product.addons) {
                const restoredAddons = {};
                editItemData.variant.addons.forEach(addon => {
                    product.addons.forEach(group => {
                        const match = group.options.find(opt => opt.name === addon.name);
                        if (match) {
                            restoredAddons[group.title] = match;
                        }
                    });
                });
                setSelectedAddons(restoredAddons);
            }

            // 3. Restore Files
            if (editItemData.designFiles && Array.isArray(editItemData.designFiles)) {
                setDesignFiles(editItemData.designFiles);
            }
        }
    }, [editItemData, product.id, product.addons]);

    // --- EFFECT: HITUNG TOTAL QTY & HARGA SATUAN ---
    useEffect(() => {
        // Hitung total quantity
        const qty = Object.values(sizeQuantities).reduce((acc, val) => acc + (parseInt(val) || 0), 0);
        setTotalQty(qty);

        // Hitung tambahan harga dari Addons
        let addonTotal = 0;
        Object.values(selectedAddons).forEach(option => {
            if (option && option.price) addonTotal += parseFloat(option.price);
        });
        
        setUnitPrice(parseFloat(product.base_price) + addonTotal);
    }, [sizeQuantities, selectedAddons, product.base_price]);

    // --- HANDLERS ---
    
    const handleSizeQtyChange = (size, delta) => {
        setSizeQuantities(prev => {
            const currentQty = prev[size] || 0;
            const newQty = Math.max(0, currentQty + delta);
            return { ...prev, [size]: newQty };
        });
    };

    const handleManualQtyChange = (size, value) => {
        const val = parseInt(value);
        setSizeQuantities(prev => ({
            ...prev,
            [size]: isNaN(val) ? 0 : Math.max(0, val)
        }));
    };

    const handleAddonChange = (groupTitle, option) => {
        setSelectedAddons(prev => ({ ...prev, [groupTitle]: option }));
    };

    // Handler Upload File
    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const combinedFiles = [...designFiles, ...newFiles];

        if (combinedFiles.length > 5) {
            alert("Maksimal upload 5 file desain.");
            return;
        }

        setDesignFiles(combinedFiles);
        // Reset input value agar file yang sama bisa diupload ulang jika dihapus
        e.target.value = null; 
    };

    const removeFile = (index) => {
        setDesignFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddToCart = () => {
        if (totalQty === 0) {
            alert("Harap masukkan jumlah pesanan minimal 1 pcs!");
            return;
        }

        // Validasi Addons Wajib
        if (product.addons && product.addons.length > 0) {
            const missingAddons = product.addons.filter(group => !selectedAddons[group.title]);
            if (missingAddons.length > 0) {
                const missingNames = missingAddons.map(g => g.title).join(', ');
                alert(`Harap pilih opsi kustomisasi untuk: ${missingNames}`);
                return;
            }
        }

        // Filter ukuran yang quantity-nya lebih dari 0
        const selectedSizes = Object.fromEntries(
            Object.entries(sizeQuantities).filter(([_, qty]) => qty > 0)
        );

        const addonsArray = Object.values(selectedAddons);

        // Eksekusi fungsi context Cart
        addToCart(
            product, 
            totalQty, 
            { 
                sizes: selectedSizes, 
                addons: addonsArray 
            }, 
            designFiles,
            isEditing ? editIndex : -1 
        );

        router.visit(route('cart.index'));
    };

    const handleCancelEdit = () => {
        setItemToEdit(null); // Clear context
        router.visit(route('cart.index'));
    };

    return (
        <GuestLayout title={product.name}>
            <Head title={`${product.name} - GR-DOU`} />

            <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumb */}
                    <nav className="mb-8 flex items-center text-sm font-medium text-slate-500">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
                        <span className="mx-2 text-slate-300">/</span>
                        <Link href={route('katalog.index')} className="hover:text-blue-600 transition-colors">Katalog</Link> 
                        <span className="mx-2 text-slate-300">/</span>
                        <span className="text-slate-900 truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
                        
                        {isEditing && (
                            <span className="ml-4 bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-md text-[10px] font-black tracking-wider uppercase border border-amber-200 shadow-sm animate-pulse">
                                Mode Edit
                            </span>
                        )}
                    </nav>

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            
                            {/* --- KOLOM KIRI: GAMBAR PRODUK --- */}
                            <div className="lg:col-span-5 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50">
                                <div className="sticky top-24 space-y-4">
                                    {/* Main Image */}
                                    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white aspect-[4/3] sm:aspect-square relative group shadow-sm">
                                        <img 
                                            src={mainImage} 
                                            alt={product.name} 
                                            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" 
                                            onError={(e) => { e.target.src = "https://placehold.co/600x600/eeeeee/999999?text=Gambar+Produk"; }}
                                        />
                                    </div>
                                    
                                    {/* Thumbnails Gallery */}
                                    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                                        <button 
                                            onClick={() => setMainImage(product.thumbnail)} 
                                            className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${mainImage === product.thumbnail ? 'border-blue-500 shadow-md scale-105' : 'border-slate-200 hover:border-blue-300 opacity-70 hover:opacity-100'}`}
                                        >
                                            <img src={product.thumbnail} className="w-full h-full object-cover" />
                                        </button>
                                        
                                        {product.images && Array.isArray(product.images) && product.images.map((img, idx) => (
                                            <button 
                                                key={idx} 
                                                onClick={() => setMainImage(img)} 
                                                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-blue-500 shadow-md scale-105' : 'border-slate-200 hover:border-blue-300 opacity-70 hover:opacity-100'}`}
                                            >
                                                <img src={img} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* --- KOLOM KANAN: DETAIL & FORM ORDER --- */}
                            <div className="lg:col-span-7 p-6 lg:p-10 lg:pl-12">
                                
                                {/* Header Judul & Deskripsi */}
                                <div className="mb-8">
                                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
                                        {product.name}
                                    </h1>
                                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                                        {product.description}
                                    </p>
                                </div>
                                
                                {/* Panel Harga Premium */}
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100/50 mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 shadow-sm">
                                    <div>
                                        <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-1.5 opacity-80">Harga Satuan</p>
                                        <span className="text-2xl font-black text-blue-800">{formatIDR(unitPrice)}</span>
                                        {Object.keys(selectedAddons).length > 0 && (
                                            <p className="text-[10px] text-blue-500 font-semibold mt-1 bg-white/60 inline-block px-2 py-0.5 rounded-full">
                                                Termasuk biaya kustomisasi
                                            </p>
                                        )}
                                    </div>
                                    <div className="hidden sm:block w-px h-12 bg-blue-200/50"></div>
                                    <div className="text-left sm:text-right">
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1.5 opacity-80">Estimasi Total ({totalQty} pcs)</p>
                                        <span className="text-3xl font-black text-slate-900">{formatIDR(unitPrice * totalQty)}</span>
                                    </div>
                                </div>

                                {/* SECTION 1: UKURAN (Perbaikan Layout) */}
                                {product.available_sizes && product.available_sizes.length > 0 && (
                                    <div className="mb-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                                <FaRulerCombined className="text-slate-400" /> Pilih Ukuran
                                            </h3>
                                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                                                Total Qty: <span className="text-blue-600">{totalQty}</span>
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {product.available_sizes.map((size) => (
                                                <div 
                                                    key={size} 
                                                    className={`relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-300 ${sizeQuantities[size] > 0 ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-blue-200'}`}
                                                >
                                                    <span className={`text-sm font-black mb-3 block ${sizeQuantities[size] > 0 ? 'text-blue-700' : 'text-slate-600'}`}>
                                                        {size.toUpperCase()}
                                                    </span>
                                                    
                                                    {/* Custom Input Number */}
                                                    <div className="flex items-center justify-between w-full bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleSizeQtyChange(size, -1)} 
                                                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${sizeQuantities[size] > 0 ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'text-slate-300 cursor-not-allowed'}`}
                                                            disabled={!sizeQuantities[size]}
                                                        >
                                                            <FaMinus size={10} />
                                                        </button>
                                                        
                                                        <input 
                                                            type="number" 
                                                            min="0" 
                                                            value={sizeQuantities[size] || ''} 
                                                            placeholder="0"
                                                            onChange={(e) => handleManualQtyChange(size, e.target.value)} 
                                                            className="w-10 text-center text-sm font-bold bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-300" 
                                                        />
                                                        
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleSizeQtyChange(size, 1)} 
                                                            className="w-7 h-7 rounded-lg bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center transition-colors shadow-sm"
                                                        >
                                                            <FaPlus size={10} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* SECTION 2: ADD-ONS WAJIB */}
                                {product.addons && product.addons.length > 0 && (
                                    <div className="mb-10 space-y-5">
                                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                                <FaCheck className="text-slate-400" /> Kustomisasi
                                            </h3>
                                            <span className="text-[10px] text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-100 uppercase tracking-wider">
                                                * Wajib Dipilih
                                            </span>
                                        </div>
                                        
                                        {product.addons.map((group, idx) => {
                                            const isGroupSelected = !!selectedAddons[group.title];
                                            return (
                                                <div key={idx} className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{group.title}</h4>
                                                        {!isGroupSelected && <span className="text-[10px] text-red-500 font-bold animate-pulse">Pilih salah satu!</span>}
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {group.options.map((option, optIdx) => {
                                                            const isSelected = selectedAddons[group.title]?.name === option.name;
                                                            return (
                                                                <label 
                                                                    key={optIdx} 
                                                                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${isSelected ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-blue-200'}`}
                                                                >
                                                                    <div className="pt-0.5">
                                                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-600' : 'border-slate-300'}`}>
                                                                            {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                                                                        </div>
                                                                        <input 
                                                                            type="radio" 
                                                                            name={group.title} 
                                                                            checked={isSelected} 
                                                                            onChange={() => handleAddonChange(group.title, option)} 
                                                                            className="hidden" 
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <span className={`block text-sm font-bold ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                                                                            {option.name}
                                                                        </span>
                                                                        <span className={`block text-xs font-bold mt-1 ${option.price > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                                            {option.price > 0 ? `+ ${formatIDR(option.price)}` : 'Termasuk (Gratis)'}
                                                                        </span>
                                                                    </div>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* SECTION 3: UPLOAD DESAIN (MULTI FILE) */}
                                <div className="mb-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                            <FaImage className="text-slate-400" /> Upload Desain
                                        </h3>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${designFiles.length >= 5 ? 'bg-red-50 text-red-600 border-red-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                            {designFiles.length} / 5 File
                                        </span>
                                    </div>
                                    
                                    {/* List File yang sudah diupload */}
                                    {designFiles.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                            {designFiles.map((file, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-sm group">
                                                    <div className="flex items-center gap-3 overflow-hidden">
                                                        <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <FaImage size={16} />
                                                        </div>
                                                        <div className="min-w-0 pr-2">
                                                            <p className="text-sm font-bold text-slate-700 truncate">{file.name}</p>
                                                            <p className="text-[10px] text-slate-400 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => removeFile(idx)} 
                                                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500 rounded-lg transition-colors flex-shrink-0"
                                                        title="Hapus file"
                                                    >
                                                        <FaTrash size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Area Drop/Upload */}
                                    {designFiles.length < 5 && (
                                        <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer group">
                                            <input 
                                                type="file" 
                                                multiple 
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                                onChange={handleFileChange} 
                                            />
                                            <div className="flex flex-col items-center justify-center pointer-events-none">
                                                <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:scale-110 transition-all mb-3">
                                                    <FaPlus size={16} />
                                                </div>
                                                <span className="text-slate-700 font-bold text-sm">Klik atau Seret file desain kesini</span>
                                                <span className="text-xs text-slate-400 mt-1 font-medium">Maksimal 5 file. Format bebas (PNG, JPG, PDF, Corel).</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* --- ACTION BUTTONS --- */}
                                <div className="pt-6 border-t border-slate-200">
                                    <button 
                                        onClick={handleAddToCart}
                                        disabled={totalQty === 0}
                                        className={`w-full font-extrabold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl
                                            ${totalQty > 0 
                                                ? (isEditing 
                                                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30 hover:-translate-y-1' 
                                                    : 'bg-[#277cdd] hover:bg-blue-700 text-white shadow-[#277cdd]/30 hover:-translate-y-1') 
                                                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
                                    >
                                        {isEditing ? <FaSave size={18} /> : <FaShoppingCart size={18} />} 
                                        <span className="tracking-wide uppercase text-sm">
                                            {isEditing ? 'Simpan Perubahan' : 'Masukkan Keranjang'}
                                        </span>
                                    </button>
                                    
                                    {isEditing && (
                                        <button 
                                            onClick={handleCancelEdit} 
                                            className="w-full mt-4 text-slate-500 text-sm font-bold hover:text-slate-800 transition-colors flex items-center justify-center"
                                        >
                                            Batalkan Edit & Kembali ke Keranjang
                                        </button>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </GuestLayout>
    );
}