import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useCart } from '@/Contexts/CartContext';
import { FaShoppingCart, FaCheck, FaInfoCircle, FaPlus, FaMinus, FaRulerCombined, FaImage } from 'react-icons/fa';

export default function Show({ product }) {
    const { addToCart } = useCart();
    
    // --- STATE MANAGEMENT ---
    const [sizeQuantities, setSizeQuantities] = useState(() => {
        const initial = {};
        product.available_sizes?.forEach(size => initial[size] = 0);
        return initial;
    });

    const [totalQty, setTotalQty] = useState(0);
    const [designFile, setDesignFile] = useState(null);
    const [mainImage, setMainImage] = useState(product.thumbnail); 
    const [selectedAddons, setSelectedAddons] = useState({});
    const [unitPrice, setUnitPrice] = useState(parseFloat(product.base_price));

    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

    // --- EFFECT: HITUNG TOTAL QTY & HARGA SATUAN ---
    useEffect(() => {
        let qty = 0;
        Object.values(sizeQuantities).forEach(val => qty += val);
        setTotalQty(qty);

        let addonTotal = 0;
        Object.values(selectedAddons).forEach(option => {
            if (option && option.price) addonTotal += parseFloat(option.price);
        });
        setUnitPrice(parseFloat(product.base_price) + addonTotal);

    }, [sizeQuantities, selectedAddons, product.base_price]);

    // --- HANDLERS ---
    
    const handleSizeQtyChange = (size, delta) => {
        setSizeQuantities(prev => ({
            ...prev,
            [size]: Math.max(0, (prev[size] || 0) + delta)
        }));
    };

    const handleAddonChange = (groupTitle, option) => {
        setSelectedAddons(prev => ({ ...prev, [groupTitle]: option }));
    };

    const handleAddToCart = () => {
        // 1. Validasi Jumlah Barang
        if (totalQty === 0) {
            alert("Harap masukkan jumlah pesanan minimal 1 pcs!");
            return;
        }

        // 2. VALIDASI WAJIB PILIH ADD-ONS
        if (product.addons && product.addons.length > 0) {
            // Cari grup add-on yang belum dipilih user
            const missingAddons = product.addons.filter(group => !selectedAddons[group.title]);
            
            if (missingAddons.length > 0) {
                // Tampilkan pesan error
                const missingNames = missingAddons.map(g => g.title).join(', ');
                alert(`Harap pilih opsi untuk: ${missingNames}`);
                return; // Stop proses, jangan masuk keranjang
            }
        }

        // Ambil ukuran yang dipilih
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
            designFile
        );
    };

    return (
        <GuestLayout title={product.name}>
            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumb */}
                    <div className="mb-6 text-sm text-slate-500">
                        <Link href="/" className="hover:text-blue-600">Beranda</Link> / 
                        <Link href={route('katalog.index')} className="hover:text-blue-600 mx-1">Katalog</Link> / 
                        <span className="text-slate-900 font-medium mx-1">{product.name}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* --- KOLOM KIRI: GALERI GAMBAR --- */}
                        <div className="space-y-4 h-fit sticky top-24">
                            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 aspect-square relative group shadow-sm">
                                <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="grid grid-cols-5 gap-2">
                                <button onClick={() => setMainImage(product.thumbnail)} className={`aspect-square rounded-lg overflow-hidden border-2 transition ${mainImage === product.thumbnail ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-400'}`}>
                                    <img src={product.thumbnail} className="w-full h-full object-cover" />
                                </button>
                                {product.images?.map((img, idx) => (
                                    <button key={idx} onClick={() => setMainImage(img)} className={`aspect-square rounded-lg overflow-hidden border-2 transition ${mainImage === img ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-400'}`}>
                                        <img src={img} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* --- KOLOM KANAN: DETAIL --- */}
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
                            
                            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 mb-6 flex justify-between items-center shadow-sm">
                                <div>
                                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Harga Satuan</p>
                                    <span className="text-2xl font-bold text-blue-700">{formatIDR(unitPrice)}</span>
                                </div>
                                <div className="text-right border-l border-blue-200 pl-4">
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Total Estimasi</p>
                                    <span className="text-3xl font-extrabold text-slate-900">{formatIDR(unitPrice * totalQty)}</span>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-bold text-slate-900 mb-2 border-b border-slate-100 pb-2">Deskripsi Produk</h3>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">{product.description}</p>
                            </div>

                            {/* --- SPESIFIKASI --- */}
                            {product.specifications && product.specifications.length > 0 && (
                                <div className="mb-8 bg-slate-50 rounded-xl p-5 border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <FaRulerCombined className="text-blue-500" /> Spesifikasi & Panduan Ukuran
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
                                        {product.specifications.map((spec, idx) => (
                                            <div key={idx} className="flex justify-between border-b border-slate-200/50 pb-1 last:border-0">
                                                <span className="text-slate-500">{spec.key}</span>
                                                <span className="font-semibold text-slate-800">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* --- PILIH UKURAN --- */}
                            {product.available_sizes?.length > 0 && (
                                <div className="mb-8 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-4 flex justify-between items-center">
                                        Pilih Ukuran & Jumlah
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${totalQty > 0 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>Total: {totalQty} Pcs</span>
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {product.available_sizes.map((size) => (
                                            <div key={size} className={`flex flex-col items-center p-3 border rounded-xl transition ${sizeQuantities[size] > 0 ? 'border-blue-400 bg-blue-50/30' : 'border-slate-200 hover:border-blue-200'}`}>
                                                <span className="text-sm font-bold text-slate-800 mb-2 block uppercase">{size}</span>
                                                <div className="flex items-center gap-3">
                                                    <button onClick={() => handleSizeQtyChange(size, -1)} className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition shadow-sm"><FaMinus size={10} /></button>
                                                    <input type="number" min="0" value={sizeQuantities[size]} onChange={(e) => setSizeQuantities(prev => ({ ...prev, [size]: parseInt(e.target.value) || 0 }))} className="w-12 text-center text-sm font-bold border-none bg-transparent focus:ring-0 p-0" />
                                                    <button onClick={() => handleSizeQtyChange(size, 1)} className="w-8 h-8 rounded-full bg-slate-900 text-white hover:bg-slate-700 flex items-center justify-center transition shadow-sm"><FaPlus size={10} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* --- ADD-ONS (WAJIB PILIH) --- */}
                            {product.addons?.length > 0 && (
                                <div className="mb-8 space-y-4">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                        <h3 className="font-bold text-slate-900">Kustomisasi Tambahan</h3>
                                        <span className="text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded">* Wajib Dipilih</span>
                                    </div>
                                    
                                    {product.addons.map((group, idx) => {
                                        // Cek apakah grup ini sudah dipilih user
                                        const isGroupSelected = !!selectedAddons[group.title];
                                        
                                        return (
                                            <div key={idx} className={`p-4 rounded-xl border transition ${!isGroupSelected ? 'border-red-200 bg-red-50/30' : 'border-slate-100 bg-white'}`}>
                                                <div className="flex justify-between items-center mb-3">
                                                    <h4 className="text-xs font-bold text-slate-500 uppercase">{group.title}</h4>
                                                    {!isGroupSelected && <span className="text-[10px] text-red-500 font-semibold animate-pulse">Belum dipilih</span>}
                                                </div>
                                                <div className="space-y-2">
                                                    {group.options.map((option, optIdx) => {
                                                        const isSelected = selectedAddons[group.title]?.name === option.name;
                                                        return (
                                                            <label key={optIdx} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${isSelected ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                                                                <div className="flex items-center gap-3">
                                                                    <input 
                                                                        type="radio" 
                                                                        name={group.title} 
                                                                        checked={isSelected}
                                                                        onChange={() => handleAddonChange(group.title, option)}
                                                                        className="text-blue-600 focus:ring-blue-500"
                                                                    />
                                                                    <span className="text-sm font-medium text-slate-700">{option.name}</span>
                                                                </div>
                                                                {option.price > 0 ? (
                                                                    <span className="text-xs font-bold text-blue-600 bg-white px-2 py-1 rounded border border-blue-100">+{formatIDR(option.price)}</span>
                                                                ) : (
                                                                    <span className="text-xs text-slate-400">Standar</span>
                                                                )}
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* --- UPLOAD DESAIN --- */}
                            <div className="mb-8">
                                <h3 className="font-bold text-slate-900 mb-2">File Desain (Opsional)</h3>
                                <div className={`border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer relative ${designFile ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'}`}>
                                    <input type="file" id="designUpload" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setDesignFile(e.target.files[0])} />
                                    <div className="flex flex-col items-center justify-center pointer-events-none">
                                        {designFile ? (
                                            <>
                                                <FaCheck className="text-green-500 text-2xl mb-2" />
                                                <span className="font-bold text-green-700 text-sm">{designFile.name}</span>
                                                <span className="text-xs text-green-600 mt-1">Klik untuk mengganti file</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaImage className="text-slate-400 text-2xl mb-2" />
                                                <span className="text-slate-600 font-medium text-sm">Klik atau tarik file desain ke sini</span>
                                                <span className="text-xs text-slate-400 mt-1">Support JPG, PNG, PDF (Max 5MB)</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* --- ACTION BUTTON --- */}
                            <div className="pt-6 border-t border-slate-100">
                                <button 
                                    onClick={handleAddToCart}
                                    className={`w-full text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg transform active:scale-95
                                        ${totalQty > 0 ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-slate-300 cursor-not-allowed shadow-none'}`}
                                >
                                    <FaShoppingCart /> 
                                    {totalQty > 0 ? `Masukkan Keranjang — ${formatIDR(unitPrice * totalQty)}` : 'Masukkan Jumlah Pesanan'}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}