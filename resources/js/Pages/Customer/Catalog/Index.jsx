import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Index({ products }) {
    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

    return (
        <GuestLayout title="Katalog Produk">
            <div className="bg-slate-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Katalog Produk</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.data.map((product) => (
                            <Link href={route('katalog.show', product.id)} key={product.id} className="group">
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition duration-300 h-full flex flex-col">
                                    <div className="aspect-square bg-slate-200 overflow-hidden relative">
                                        <img 
                                            src={product.thumbnail} 
                                            alt={product.name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        {/* Badge Diskon jika ada */}
                                        {product.discount_price && product.discount_price > product.base_price && (
                                           <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Promo</div>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="font-bold text-slate-900 text-lg mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="mt-auto pt-2">
                                            <p className="text-blue-600 font-bold text-lg">{formatIDR(product.base_price)}</p>
                                            {product.discount_price && product.discount_price > product.base_price && (
                                                <p className="text-slate-400 text-sm line-through">{formatIDR(product.discount_price)}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}