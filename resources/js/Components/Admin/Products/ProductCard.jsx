import { Edit3, Trash2, Eye } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function ProductCard({ product, onDelete }) {
    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

    return (
        <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col h-full">
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                <img 
                    src={product.thumbnail} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                        {formatIDR(product.base_price)}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        Article
                    </span>
                </div>
                
                <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-2 line-clamp-1" title={product.name}>
                    {product.name}
                </h3>
                
                <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed flex-1">
                    {product.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                    <Link 
                        href={route('admin.product.show', product.id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
                    >
                        <Eye size={14} /> Details
                    </Link>
                    
                    <Link 
                        href={route('admin.product.edit', product.id)}
                        className="p-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        title="Edit"
                    >
                        <Edit3 size={16} />
                    </Link>
                    
                    <button 
                        onClick={() => onDelete(product)}
                        className="p-2.5 border border-slate-200 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-colors"
                        title="Hapus"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}