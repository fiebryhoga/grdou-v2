import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Layouts/Sidebar';
import Navbar from '@/Components/Admin/Layouts/Navbar';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden">
            {/* Komponen Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            {/* Area Utama */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Komponen Navbar */}
                <Navbar 
                    user={user} 
                    isSidebarOpen={isSidebarOpen} 
                    setIsSidebarOpen={setIsSidebarOpen} 
                    header={header} 
                />

                {/* Konten Utama */}
                {/* Padding dikurangi menjadi p-4 sm:p-6 agar lebih rapat dengan tepi */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-2">
                    {/* Menghapus max-w-7xl dan mx-auto agar layout menggunakan lebar penuh secara maksimal */}
                    <div className="w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}