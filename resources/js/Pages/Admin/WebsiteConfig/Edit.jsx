import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, config }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put', // Trick Inertia untuk upload file via POST route update
        title: config?.title || '',
        description: config?.description || '',
        keunggulan: config?.keunggulan || '',
        whatsapp: config?.whatsapp || '',
        email: config?.email || '',
        address: config?.address || '',
        youtube: config?.youtube || '',
        facebook: config?.facebook || '',
        instagram: config?.instagram || '',
        client_image_1: null,
        client_image_2: null,
        client_image_3: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.config.update'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Konfigurasi Website</h2>}>
            <Head title="Konfigurasi Website" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={submit} className="space-y-6">
                            {/* Title & Description */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-medium">Judul Website</label>
                                    <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                </div>
                                <div>
                                    <label className="block font-medium">Email</label>
                                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium">Deskripsi</label>
                                <textarea value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows="3"></textarea>
                            </div>

                            {/* Info Kontak & Sosmed */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block font-medium">WhatsApp</label>
                                    <input type="text" value={data.whatsapp} onChange={e => setData('whatsapp', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                </div>
                                <div>
                                    <label className="block font-medium">Instagram URL</label>
                                    <input type="text" value={data.instagram} onChange={e => setData('instagram', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                </div>
                                <div>
                                    <label className="block font-medium">Facebook URL</label>
                                    <input type="text" value={data.facebook} onChange={e => setData('facebook', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                </div>
                            </div>

                            {/* Client Images */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3].map((num) => (
                                    <div key={num}>
                                        <label className="block font-medium">Client Image {num}</label>
                                        {config && config[`client_image_${num}`] && (
                                            <img src={`/storage/${config[`client_image_${num}`]}`} alt={`Client ${num}`} className="h-20 mb-2 rounded" />
                                        )}
                                        <input type="file" accept="image/*" onChange={e => setData(`client_image_${num}`, e.target.files[0])} className="mt-1 block w-full" />
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Simpan Konfigurasi
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}