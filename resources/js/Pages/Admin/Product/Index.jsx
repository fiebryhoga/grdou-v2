import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search, Edit3, Trash2, Eye, MoreHorizontal, PackageOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

// Komponen Pagination Sederhana
const Pagination = ({ links }) => {
    return (
        links.length > 3 && (
            <div className="flex flex-wrap justify-center gap-1 mt-6">
                {links.map((link, key) => (
                    <div key={key}>
                        {link.url === null ? (
                            <div className="mr-1 mb-1 px-3 py-2 text-sm leading-4 text-gray-400 border rounded-lg">
                                <span dangerouslySetInnerHTML={{ __html: link.label }}></span>
                            </div>
                        ) : (
                            <Link
                                className={`mr-1 mb-1 px-3 py-2 text-sm leading-4 border rounded-lg hover:bg-white focus:border-indigo-500 focus:text-indigo-500 ${link.active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700'}`}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        )}
                    </div>
                ))}
            </div>
        )
    );
};

export default function Index({ auth, products, filters }) {
    // State untuk Search
    const [search, setSearch] = useState(filters.search || '');
    
    // Format Rupiah
    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

    // Handle Search dengan Delay (Debounce) agar tidak spam request
    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route('admin.product.index'),
                { search: search },
                { preserveState: true, replace: true }
            );
        }, 300); // Tunggu 300ms setelah mengetik

        return () => clearTimeout(timer);
    }, [search]);

    const deleteProduct = (product) => {
        if (confirm(`Hapus permanen "${product.name}"?`)) {
            router.delete(route('admin.product.destroy', product.id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manajemen Produk" />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Inventory Produk</h1>
                        <p className="text-gray-500 text-sm mt-1">Kelola katalog dan harga produk.</p>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        {/* Search Input */}
                        <div className="relative w-full md:w-64 group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                                placeholder="Cari nama produk..."
                            />
                        </div>

                        {/* Add Button */}
                        <Link
                            href={route('admin.product.create')}
                            className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 shadow-lg shadow-gray-200 transition-all transform hover:-translate-y-0.5"
                        >
                            <Plus size={18} className="mr-2" /> Baru
                        </Link>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Produk</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Harga</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {products.data.length > 0 ? (
                                    products.data.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                            {/* Kolom Produk */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-12 w-12 flex-shrink-0">
                                                        <img className="h-12 w-12 rounded-lg object-cover border border-gray-100 shadow-sm" src={product.thumbnail} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-gray-900">{product.name}</div>
                                                        <div className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{product.description}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            {/* Kolom Harga */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    {/* Harga Jual Selalu Paling Atas & Tebal */}
                                                    <span className="text-sm font-bold text-slate-900">
                                                        {formatIDR(product.base_price)}
                                                    </span>
                                                    
                                                    {/* Jika ada harga coret (Markup), tampilkan dicoret di bawahnya */}
                                                    {product.discount_price && product.discount_price > product.base_price && (
                                                        <span className="text-xs text-red-400 line-through">
                                                            {formatIDR(product.discount_price)}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Kolom Status */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    product.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {product.is_active ? 'Active' : 'Draft'}
                                                </span>
                                            </td>

                                            {/* Kolom Tanggal */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(product.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric', month: 'short', year: 'numeric'
                                                })}
                                            </td>

                                            {/* Kolom Aksi */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link 
                                                        href={route('admin.product.show', product.id)}
                                                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Lihat Detail"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                    <Link 
                                                        href={route('admin.product.edit', product.id)}
                                                        className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit3 size={18} />
                                                    </Link>
                                                    <button 
                                                        onClick={() => deleteProduct(product)}
                                                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <PackageOpen className="h-12 w-12 text-gray-300 mb-3" />
                                                <p className="text-gray-500 font-medium">Tidak ada produk ditemukan</p>
                                                <p className="text-gray-400 text-sm mt-1">Coba sesuaikan kata kunci pencarian Anda.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Paginasi */}
                <div className="mt-4">
                    <Pagination links={products.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}