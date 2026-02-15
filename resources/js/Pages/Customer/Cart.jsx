import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useCart } from '@/Contexts/CartContext';
import { FaTrash, FaArrowRight, FaPaperclip, FaShoppingCart } from 'react-icons/fa';

export default function Cart() {
    const { cart, removeFromCart, getTotalPrice } = useCart();
    
    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

    // Helper untuk merender list ukuran dari Object
    // Input: { "S": 2, "XL": 4 } -> Output: "S (2), XL (4)"
    const renderSizeList = (sizes) => {
        if (!sizes || typeof sizes !== 'object') return '-';
        return Object.entries(sizes)
            .map(([size, qty]) => `${size} (${qty})`)
            .join(', ');
    };

    return (
        <GuestLayout title="Keranjang Belanja">
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <FaShoppingCart className="text-blue-600" /> Keranjang Belanja Anda
                </h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                        <div className="mb-4 text-slate-300 flex justify-center">
                            <FaShoppingCart size={48} />
                        </div>
                        <p className="text-slate-500 mb-6 text-lg">Keranjang Anda masih kosong.</p>
                        <Link href={route('katalog.index')} className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                            Mulai Belanja &rarr;
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* --- LIST ITEM DI KERANJANG --- */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item, index) => (
                                <div key={index} className="flex gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition duration-300">
                                    {/* Thumbnail */}
                                    <div className="w-24 h-24 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-100">
                                        <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Detail Item */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-slate-900 text-lg leading-tight truncate pr-2">{item.name}</h3>
                                            <button 
                                                onClick={() => removeFromCart(index)} 
                                                className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                                                title="Hapus Item"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>

                                        {/* Rincian Ukuran (Bulk) */}
                                        {item.variant?.sizes ? (
                                            <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-2 rounded inline-block border border-slate-100">
                                                <span className="font-bold text-slate-800">Rincian Size:</span> {renderSizeList(item.variant.sizes)}
                                            </div>
                                        ) : item.variant?.size ? (
                                            // Fallback jika single size
                                            <p className="text-sm text-slate-500 mt-1">Ukuran: {item.variant.size}</p>
                                        ) : null}

                                        {/* Rincian Addons */}
                                        {item.variant?.addons?.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {item.variant.addons.map((addon, idx) => (
                                                    <span key={idx} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 font-medium">
                                                        + {addon.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Indikator File Desain */}
                                        {item.designFile && (
                                            <div className="mt-2 flex items-center gap-1 text-[10px] text-green-600 font-bold bg-green-50 px-2 py-1 rounded w-fit">
                                                <FaPaperclip /> File: {item.designFile.name}
                                            </div>
                                        )}

                                        {/* Harga */}
                                        <div className="mt-3 flex items-center gap-2">
                                            <p className="text-blue-600 font-bold">
                                                {formatIDR(item.finalPrice || item.price)}
                                            </p>
                                            <span className="text-slate-400 text-sm">x {item.quantity} Pcs</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* --- SUMMARY BOX --- */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 h-fit shadow-sm sticky top-24">
                            <h3 className="font-bold text-lg mb-6 text-slate-900 border-b border-slate-100 pb-4">Ringkasan Pesanan</h3>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm text-slate-600">
                                    <span>Total Item</span>
                                    <span className="font-semibold text-slate-900">{cart.reduce((a, c) => a + c.quantity, 0)} Pcs</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-600">
                                    <span>Berat Estimasi</span>
                                    <span className="font-semibold text-slate-900">{(cart.reduce((a, c) => a + c.quantity, 0) * 0.25).toFixed(1)} Kg</span>
                                </div>
                            </div>

                            <div className="flex justify-between mb-8 text-xl font-bold text-slate-900 pt-4 border-t border-dashed border-slate-300">
                                <span>Total Harga</span>
                                <span className="text-blue-600">{formatIDR(getTotalPrice())}</span>
                            </div>
                            
                            <Link 
                                href={route('checkout.form')}
                                className="block w-full bg-slate-900 text-white text-center py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                Lanjut Pembayaran <FaArrowRight size={14}/>
                            </Link>
                            
                            <Link href={route('katalog.index')} className="block text-center mt-4 text-sm text-slate-500 hover:text-blue-600 font-medium">
                                Kembali Belanja
                            </Link>
                        </div>

                    </div>
                )}
            </div>
        </GuestLayout>
    );
}