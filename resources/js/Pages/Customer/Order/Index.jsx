import { useState, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { ShoppingBag, Calculator, User, Phone, CheckCircle, ChevronLeft } from 'lucide-react';

// Hapus 'auth' dari props karena ini halaman publik
export default function TestOrder({ products }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    const { data, setData, post, processing } = useForm({
        customer_name: '',
        customer_whatsapp: '',
        product_id: '',
        size_details: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
        selected_addons: {}, 
        total_qty: 0,
        total_price: 0,
        notes: ''
    });

    useEffect(() => {
        const qty = Object.values(data.size_details).reduce((a, b) => a + parseInt(b || 0), 0);
        
        let addonPrice = 0;
        Object.values(data.selected_addons).forEach(addon => {
            addonPrice += parseFloat(addon.price || 0);
        });

        const base = selectedProduct ? parseFloat(selectedProduct.base_price) : 0;
        const total = qty * (base + addonPrice);

        setData(d => ({ ...d, total_qty: qty, total_price: total }));
    }, [data.size_details, data.selected_addons, selectedProduct]);

    const handleProductChange = (id) => {
        const prod = products.find(p => p.id == id);
        setSelectedProduct(prod);
        setData('product_id', id);
    };

    const handleSizeChange = (size, val) => {
        setData('size_details', { ...data.size_details, [size]: val });
    };

    const submitOrder = (e) => {
        e.preventDefault();
        post(route('customer.order.store')); // Sesuaikan dengan nama route di controller customer kamu
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <Head title="Estimasi Order | GR-DOU Konveksi" />

            <div className="max-w-6xl mx-auto mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 italic tracking-tighter">GR-DOU <span className="text-blue-600">PRODUCTION</span></h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Estimasi Biaya Produksi</p>
                </div>
                <Link href="/" className="text-[10px] font-black uppercase text-slate-400 hover:text-blue-600 transition-colors">
                    Back to Home
                </Link>
            </div>

            <form onSubmit={submitOrder} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    {/* Data Pelanggan */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <h3 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
                            <User size={18} className="text-blue-600" /> Informasi Kontak
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Nama Anda" required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-2 focus:ring-blue-600 transition-all" 
                                value={data.customer_name} onChange={e => setData('customer_name', e.target.value)} />
                            <input type="text" placeholder="Nomor WhatsApp (Aktif)" required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-2 focus:ring-blue-600 transition-all"
                                value={data.customer_whatsapp} onChange={e => setData('customer_whatsapp', e.target.value)} />
                        </div>
                    </div>

                    {/* Pilih Produk & Matriks Ukuran */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <h3 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
                            <ShoppingBag size={18} className="text-blue-600" /> Produk & Jumlah Pesanan
                        </h3>
                        
                        <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold mb-8" 
                            onChange={e => handleProductChange(e.target.value)}>
                            <option value="">Pilih Jenis Pakaian...</option>
                            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>

                        {selectedProduct && (
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                {Object.keys(data.size_details).map(size => (
                                    <div key={size} className="bg-slate-50 p-4 rounded-2xl text-center">
                                        <p className="text-xs font-black text-slate-400 mb-2">{size}</p>
                                        <input type="number" min="0" className="w-full bg-white border-none rounded-xl text-center font-black text-blue-600" 
                                            value={data.size_details[size]} onChange={e => handleSizeChange(size, e.target.value)} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Kustomisasi Addons */}
                    {selectedProduct && selectedProduct.addons && (
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 animate-in fade-in duration-700">
                            <h3 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest">Pilihan Bahan & Sablon</h3>
                            <div className="space-y-4">
                                {selectedProduct.addons.map((group, idx) => (
                                    <div key={idx}>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{group.group_name}</label>
                                        <select required className="w-full mt-2 px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold text-sm"
                                            onChange={e => {
                                                const opt = group.options.find(o => o.label === e.target.value);
                                                if(opt) setData('selected_addons', { ...data.selected_addons, [group.group_name]: { label: opt.label, price: opt.extra_price } });
                                            }}>
                                            <option value="">Pilih {group.group_name}...</option>
                                            {group.options.map((opt, oIdx) => (
                                                <option key={oIdx} value={opt.label}>{opt.label} (+ Rp{new Intl.NumberFormat('id-ID').format(opt.extra_price)})</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Billing */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl sticky top-10">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                            <Calculator size={18} className="text-blue-400" /> Ringkasan Biaya
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Total Kuantitas</span>
                                <span className="text-white text-2xl font-black">{data.total_qty} <span className="text-xs text-slate-500 uppercase">Pcs</span></span>
                            </div>
                            <div className="h-[1px] bg-slate-800 my-4"></div>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400 italic">Harga Dasar</span>
                                    <span>Rp{selectedProduct ? new Intl.NumberFormat('id-ID').format(selectedProduct.base_price) : 0}</span>
                                </div>
                                {Object.entries(data.selected_addons).map(([name, val], i) => (
                                    <div key={i} className="flex justify-between text-xs">
                                        <span className="text-slate-400">{val.label}</span>
                                        <span className="text-emerald-400">+Rp{new Intl.NumberFormat('id-ID').format(val.price)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 text-center border-t border-slate-800 mt-8">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Estimasi Total</p>
                                <h2 className="text-4xl font-black text-blue-400">
                                    Rp{new Intl.NumberFormat('id-ID').format(data.total_price)}
                                </h2>
                            </div>

                            <button type="submit" disabled={processing || data.total_qty === 0} 
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white font-black py-5 rounded-2xl mt-8 shadow-lg shadow-blue-900 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs active:scale-95">
                                <CheckCircle size={18} /> {processing ? 'Memproses...' : 'Kirim Pesanan'}
                            </button>
                            <p className="text-[9px] text-center text-slate-500 mt-4 italic">* Harga dapat berubah sesuai detail kerumitan desain sablon.</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}