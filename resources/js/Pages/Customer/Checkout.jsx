import React, { useEffect, useState } from 'react';
// ... import lainnya (Head, useForm, GuestLayout, dll)
import axios from 'axios'; // Pastikan install axios: npm install axios

export default function Checkout() {
    const { cart, getTotalPrice } = useCart();
    
    // --- STATE ONGKIR ---
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [shippingServices, setShippingServices] = useState([]); // Daftar layanan (REG, YES, OKE)
    
    // Pilihan User
    const [selectedProv, setSelectedProv] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCourier, setSelectedCourier] = useState('');
    const [selectedService, setSelectedService] = useState(null); // Objek layanan terpilih

    // Setup Form Inertia
    const { data, setData, post, processing, errors } = useForm({
        // ... data diri ...
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        shipping_address: '',
        
        // Data Ongkir yg dikirim ke Backend
        shipping_cost: 0, 
        shipping_courier: '',
        shipping_service: '',
        
        items: [] 
    });

    // 1. Load Provinsi saat pertama kali buka
    useEffect(() => {
        axios.get('/api/ongkir/provinces').then(res => setProvinces(res.data));
    }, []);

    // 2. Load Kota saat Provinsi dipilih
    useEffect(() => {
        if (selectedProv) {
            axios.get(`/api/ongkir/cities/${selectedProv}`).then(res => setCities(res.data));
        }
    }, [selectedProv]);

    // 3. Fungsi Cek Harga (Dipanggil saat tombol/dropdown kurir berubah)
    const checkOngkir = (courierCode) => {
        setSelectedCourier(courierCode);
        if (!selectedCity || !courierCode) return;

        // Hitung total berat (Default 250gram per item jika tidak ada data berat)
        const totalWeight = cart.reduce((acc, item) => acc + (item.quantity * 250), 0);

        axios.post('/api/ongkir/check', {
            city_id: selectedCity,
            weight: totalWeight, 
            courier: courierCode
        }).then(res => {
            // RajaOngkir return array, ambil costs nya
            setShippingServices(res.data[0].costs); 
        });
    };

    // 4. Saat Layanan (Service) dipilih user
    const handleServiceChange = (service) => {
        const cost = service.cost[0].value; // Ambil harga
        setSelectedService(service);
        
        // Masukkan ke Form Data agar tersimpan di DB
        setData(prev => ({
            ...prev,
            shipping_cost: cost,
            shipping_service: service.service,
            shipping_courier: selectedCourier
        }));
    };

    // Hitung Grand Total
    const grandTotal = getTotalPrice() + (selectedService ? selectedService.cost[0].value : 0);

    // ... (useEffect mapping cart items sama seperti sebelumnya) ...
    // ... (handleSubmit sama seperti sebelumnya) ...

    return (
        <GuestLayout title="Checkout">
             {/* ... Header Checkout ... */}
             
             <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* KOLOM KIRI */}
                <div className="space-y-6">
                    {/* ... Form Data Diri (Nama, Email, HP) ... */}

                    {/* --- AREA CEK ONGKIR --- */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-bold mb-4">Pengiriman</h2>
                        <div className="space-y-4">
                            
                            {/* Provinsi */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Provinsi</label>
                                <select className="w-full rounded-xl border-slate-300" onChange={e => setSelectedProv(e.target.value)}>
                                    <option value="">Pilih Provinsi</option>
                                    {provinces.map(p => (
                                        <option key={p.province_id} value={p.province_id}>{p.province}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Kota */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Kota/Kabupaten</label>
                                <select className="w-full rounded-xl border-slate-300" disabled={!selectedProv} onChange={e => setSelectedCity(e.target.value)}>
                                    <option value="">Pilih Kota</option>
                                    {cities.map(c => (
                                        <option key={c.city_id} value={c.city_id}>{c.type} {c.city_name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Alamat Detail */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Alamat Lengkap</label>
                                <textarea className="w-full rounded-xl border-slate-300" 
                                    value={data.shipping_address} onChange={e => setData('shipping_address', e.target.value)} 
                                    placeholder="Jalan, No Rumah, RT/RW..."></textarea>
                            </div>

                            {/* Pilih Kurir */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Kurir</label>
                                <select className="w-full rounded-xl border-slate-300" disabled={!selectedCity} onChange={e => checkOngkir(e.target.value)}>
                                    <option value="">Pilih Kurir</option>
                                    <option value="jne">JNE</option>
                                    <option value="pos">POS Indonesia</option>
                                    <option value="tiki">TIKI</option>
                                </select>
                            </div>

                            {/* Hasil Cek Ongkir (Radio Button) */}
                            {shippingServices.length > 0 && (
                                <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <p className="text-sm font-bold mb-2">Pilih Layanan:</p>
                                    <div className="space-y-2">
                                        {shippingServices.map((srv, idx) => (
                                            <label key={idx} className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer hover:bg-white ${selectedService?.service === srv.service ? 'border-blue-500 bg-blue-50' : 'border-slate-300'}`}>
                                                <div className="flex items-center gap-3">
                                                    <input type="radio" name="service" 
                                                        onChange={() => handleServiceChange(srv)} 
                                                        checked={selectedService?.service === srv.service}
                                                    />
                                                    <div>
                                                        <p className="font-bold text-sm">{srv.service}</p>
                                                        <p className="text-xs text-slate-500">{srv.description} ({srv.cost[0].etd} Hari)</p>
                                                    </div>
                                                </div>
                                                <span className="font-bold text-blue-700">Rp {srv.cost[0].value.toLocaleString('id-ID')}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* KOLOM KANAN: RINGKASAN */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit sticky top-24">
                    <h2 className="text-lg font-bold mb-6">Total Pembayaran</h2>
                    
                    {/* ... List Barang Cart ... */}

                    <div className="border-t border-slate-300 pt-4 space-y-2 mt-4">
                        <div className="flex justify-between text-slate-600">
                            <span>Total Harga Barang</span>
                            <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Ongkos Kirim</span>
                            <span className="font-bold">
                                {selectedService ? `Rp ${selectedService.cost[0].value.toLocaleString('id-ID')}` : '-'}
                            </span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-300 mt-2">
                            <span>Grand Total</span>
                            <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={processing || !selectedService}
                        className={`w-full mt-6 py-4 rounded-xl font-bold text-white shadow-lg transition
                            ${!selectedService ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        Bayar Sekarang
                    </button>
                </div>
             </form>
        </GuestLayout>
    );
}