import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useCart } from '@/Contexts/CartContext';
import { 
    FaShoppingCart, FaCheck, FaPlus, 
    FaMinus, FaRulerCombined, FaImage, FaTrash, FaSave 
} from 'react-icons/fa';

export default function Show({ product }) {
    const { addToCart, editItemData, setItemToEdit } = useCart(); 
    
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

    useEffect(() => {
        if (editItemData && editItemData.id === product.id) {
            setIsEditing(true);
            setEditIndex(editItemData.indexInCart);

            if (editItemData.variant?.sizes) {
                setSizeQuantities(prev => ({
                    ...prev,
                    ...editItemData.variant.sizes
                }));
            }

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

            if (editItemData.designFiles && Array.isArray(editItemData.designFiles)) {
                setDesignFiles(editItemData.designFiles);
            }
        }
    }, [editItemData, product.id, product.addons]);

    useEffect(() => {
        const qty = Object.values(sizeQuantities).reduce((acc, val) => acc + (parseInt(val) || 0), 0);
        setTotalQty(qty);

        let addonTotal = 0;
        Object.values(selectedAddons).forEach(option => {
            if (option && option.price) addonTotal += parseFloat(option.price);
        });
        
        setUnitPrice(parseFloat(product.base_price) + addonTotal);
    }, [sizeQuantities, selectedAddons, product.base_price]);
    
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

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const combinedFiles = [...designFiles, ...newFiles];

        if (combinedFiles.length > 5) {
            alert("Maksimal upload 5 file desain.");
            return;
        }

        setDesignFiles(combinedFiles);
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

        if (product.addons && product.addons.length > 0) {
            const missingAddons = product.addons.filter(group => !selectedAddons[group.title]);
            if (missingAddons.length > 0) {
                const missingNames = missingAddons.map(g => g.title).join(', ');
                alert(`Harap pilih opsi kustomisasi untuk: ${missingNames}`);
                return;
            }
        }

        const selectedSizes = Object.fromEntries(
            Object.entries(sizeQuantities).filter(([_, qty]) => qty > 0)
        );

        const addonsArray = Object.values(selectedAddons);

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
        setItemToEdit(null); 
        router.visit(route('cart.index'));
    };

    return (
        <GuestLayout title={product.name}>
            <Head title={`${product.name} - GR-DOU`} />

            <div className="bg-white min-h-screen py-10 lg:py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#277cdd]/5 rounded-full blur-3xl z-0 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-[#277cdd]/5 rounded-full blur-3xl z-0 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                    
                    <nav className="mb-8 flex items-center text-sm font-semibold text-gray-500">
                        <Link href="/" className="hover:text-[#277cdd] transition-colors">Beranda</Link>
                        <span className="mx-3 text-gray-300">/</span>
                        <Link href={route('katalog.index')} className="hover:text-[#277cdd] transition-colors">Katalog</Link> 
                        <span className="mx-3 text-gray-300">/</span>
                        <span className="text-gray-900 truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
                        
                        {isEditing && (
                            <span className="ml-4 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] font-black tracking-widest capitalize border border-orange-200 shadow-sm animate-pulse">
                                Mode Edit
                            </span>
                        )}
                    </nav>

                    <div className="bg-white rounded-[2rem] shadow-2xl shadow-[#277cdd]/5 border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            
                            <div className="lg:col-span-5 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/50">
                                <div className="sticky top-28 space-y-6">
                                    <div className="rounded-lg overflow-hidden border border-gray-200 bg-white aspect-square relative group shadow-sm">
                                        <img 
                                            src={mainImage} 
                                            alt={product.name} 
                                            className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110" 
                                            onError={(e) => { e.target.src = "https://placehold.co/600x600/f8fafc/94a3b8?text=Gambar+Produk"; }}
                                        />
                                    </div>
                                    
                                    <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        <button 
                                            onClick={() => setMainImage(product.thumbnail)} 
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${mainImage === product.thumbnail ? 'border-[#277cdd] shadow-lg shadow-[#277cdd]/20 scale-105' : 'border-gray-200 hover:border-[#277cdd]/50 opacity-70 hover:opacity-100'}`}
                                        >
                                            <img src={product.thumbnail} className="w-full h-full object-cover" />
                                        </button>
                                        
                                        {product.images && Array.isArray(product.images) && product.images.map((img, idx) => (
                                            <button 
                                                key={idx} 
                                                onClick={() => setMainImage(img)} 
                                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${mainImage === img ? 'border-[#277cdd] shadow-lg shadow-[#277cdd]/20 scale-105' : 'border-gray-200 hover:border-[#277cdd]/50 opacity-70 hover:opacity-100'}`}
                                            >
                                                <img src={img} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12">
                                
                                <div className="mb-10">
                                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
                                        {product.name}
                                    </h1>
                                    <p className="text-gray-500 text-base leading-relaxed whitespace-pre-line font-medium">
                                        {product.description}
                                    </p>
                                </div>
                                
                                <div className="bg-[#277cdd]/5 p-6 sm:p-8 rounded-lg border border-[#277cdd]/10 mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 shadow-sm">
                                    <div>
                                        <p className="text-[11px] text-[#277cdd] font-bold capitalize tracking-widest mb-1">Harga Satuan</p>
                                        <span className="text-3xl font-black text-[#277cdd]">{formatIDR(unitPrice)}</span>
                                        {Object.keys(selectedAddons).length > 0 && (
                                            <p className="text-[10px] text-[#277cdd] font-bold mt-2 bg-white px-3 py-1 rounded-full shadow-sm inline-block">
                                                Termasuk biaya kustomisasi
                                            </p>
                                        )}
                                    </div>
                                    <div className="hidden sm:block w-px h-16 bg-[#277cdd]/20"></div>
                                    <div className="text-left sm:text-right">
                                        <p className="text-[11px] text-gray-500 font-bold capitalize tracking-widest mb-1">Estimasi Total ({totalQty} pcs)</p>
                                        <span className="text-3xl font-black text-gray-900">{formatIDR(unitPrice * totalQty)}</span>
                                    </div>
                                </div>

                                {product.available_sizes && product.available_sizes.length > 0 && (
                                    <div className="mb-10">
                                        <div className="flex items-center justify-between mb-5">
                                            <h3 className="text-sm font-extrabold text-gray-900 capitalize tracking-widest flex items-center gap-2">
                                                <FaRulerCombined className="text-gray-400" /> Pilih Ukuran
                                            </h3>
                                            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-4 py-1.5 rounded-full border border-gray-200">
                                                Total Qty: <span className="text-[#277cdd] text-sm ml-1">{totalQty}</span>
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {product.available_sizes.map((size) => (
                                                <div 
                                                    key={size} 
                                                    className={`relative flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-300 ${sizeQuantities[size] > 0 ? 'border-[#277cdd] bg-[#277cdd]/5 shadow-sm' : 'border-gray-200 bg-white hover:border-[#277cdd]/30'}`}
                                                >
                                                    <span className={`text-base font-black mb-4 block ${sizeQuantities[size] > 0 ? 'text-[#277cdd]' : 'text-gray-700'}`}>
                                                        {size.toUpperCase()}
                                                    </span>
                                                    
                                                    <div className="flex items-center justify-between w-full bg-white rounded-lg border border-gray-200 p-1.5 shadow-sm">
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleSizeQtyChange(size, -1)} 
                                                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${sizeQuantities[size] > 0 ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'text-gray-300 cursor-not-allowed'}`}
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
                                                            className="w-12 text-center text-sm font-bold bg-transparent border-none p-0 focus:ring-0 text-gray-900 placeholder:text-gray-300 [&::-webkit-inner-spin-button]:appearance-none" 
                                                        />
                                                        
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleSizeQtyChange(size, 1)} 
                                                            className="w-8 h-8 rounded-lg bg-gray-900 text-white hover:bg-[#277cdd] flex items-center justify-center transition-colors shadow-sm"
                                                        >
                                                            <FaPlus size={10} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product.addons && product.addons.length > 0 && (
                                    <div className="mb-10 space-y-6">
                                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                            <h3 className="text-sm font-extrabold text-gray-900 capitalize tracking-widest flex items-center gap-2">
                                                <FaCheck className="text-gray-400" /> Kustomisasi
                                            </h3>
                                            <span className="text-[10px] text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100 capitalize tracking-widest">
                                                * Wajib Dipilih
                                            </span>
                                        </div>
                                        
                                        {product.addons.map((group, idx) => {
                                            const isGroupSelected = !!selectedAddons[group.title];
                                            return (
                                                <div key={idx} className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <h4 className="text-[11px] font-bold text-gray-500 capitalize tracking-widest">{group.title}</h4>
                                                        {!isGroupSelected && <span className="text-[10px] text-red-500 font-bold animate-pulse">Pilih salah satu!</span>}
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        {group.options.map((option, optIdx) => {
                                                            const isSelected = selectedAddons[group.title]?.name === option.name;
                                                            return (
                                                                <label 
                                                                    key={optIdx} 
                                                                    className={`flex items-start gap-4 p-5 rounded-lg border-2 cursor-pointer transition-all duration-300 ${isSelected ? 'border-[#277cdd] bg-[#277cdd]/5 shadow-sm' : 'border-gray-200 bg-white hover:border-[#277cdd]/30'}`}
                                                                >
                                                                    <div className="pt-0.5">
                                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-[#277cdd]' : 'border-gray-300'}`}>
                                                                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#277cdd]"></div>}
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
                                                                        <span className={`block text-sm font-bold ${isSelected ? 'text-[#277cdd]' : 'text-gray-900'}`}>
                                                                            {option.name}
                                                                        </span>
                                                                        <span className={`block text-xs font-bold mt-1.5 ${option.price > 0 ? 'text-emerald-500' : 'text-gray-400'}`}>
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

                                <div className="mb-10">
                                    <div className="flex items-center justify-between mb-5">
                                        <h3 className="text-sm font-extrabold text-gray-900 capitalize tracking-widest flex items-center gap-2">
                                            <FaImage className="text-gray-400" /> Upload Desain
                                        </h3>
                                        <span className={`text-xs font-bold px-4 py-1.5 rounded-full border ${designFiles.length >= 5 ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                            {designFiles.length} / 5 File
                                        </span>
                                    </div>
                                    
                                    {designFiles.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                                            {designFiles.map((file, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm group">
                                                    <div className="flex items-center gap-4 overflow-hidden">
                                                        <div className="w-10 h-10 bg-blue-50 text-[#277cdd] rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <FaImage size={18} />
                                                        </div>
                                                        <div className="min-w-0 pr-2">
                                                            <p className="text-sm font-bold text-gray-700 truncate">{file.name}</p>
                                                            <p className="text-[10px] text-gray-400 font-medium mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => removeFile(idx)} 
                                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500 rounded-lg transition-colors flex-shrink-0"
                                                    >
                                                        <FaTrash size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {designFiles.length < 5 && (
                                        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-10 text-center bg-gray-50/50 hover:bg-[#277cdd]/5 hover:border-[#277cdd]/40 transition-colors cursor-pointer group">
                                            <input 
                                                type="file" 
                                                multiple 
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                                onChange={handleFileChange} 
                                            />
                                            <div className="flex flex-col items-center justify-center pointer-events-none">
                                                <div className="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#277cdd] group-hover:scale-110 transition-all mb-4">
                                                    <FaPlus size={18} />
                                                </div>
                                                <span className="text-gray-900 font-bold text-sm">Klik atau seret file desain ke sini</span>
                                                <span className="text-xs text-gray-400 mt-2 font-medium">Maksimal 5 file. Format bebas (PNG, JPG, PDF, Corel).</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-8 border-t border-gray-100">
                                    <button 
                                        onClick={handleAddToCart}
                                        disabled={totalQty === 0}
                                        className={`w-full font-extrabold py-4 px-6 rounded-full flex items-center justify-center gap-3 transition-all duration-300 
                                            ${totalQty > 0 
                                                ? (isEditing 
                                                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 hover:-translate-y-1' 
                                                    : 'bg-[#277cdd] hover:bg-[#1f63b3] text-white shadow-lg shadow-[#277cdd]/30 hover:-translate-y-1') 
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 shadow-none'}`}
                                    >
                                        {isEditing ? <FaSave size={20} /> : <FaShoppingCart size={20} />} 
                                        <span className="tracking-widest capitalize text-sm">
                                            {isEditing ? 'Simpan Perubahan' : 'Masukkan Keranjang'}
                                        </span>
                                    </button>
                                    
                                    {isEditing && (
                                        <button 
                                            onClick={handleCancelEdit} 
                                            className="w-full mt-5 text-gray-400 text-sm font-bold hover:text-gray-700 transition-colors flex items-center justify-center"
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
        </GuestLayout>
    );
}