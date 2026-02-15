import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Layouts/Sidebar';
import Navbar from '@/Components/Admin/Layouts/Navbar';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Komponen */}
            <Sidebar isSidebarOpen={isSidebarOpen} />

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Navbar Komponen */}
                <Navbar 
                    user={user} 
                    isSidebarOpen={isSidebarOpen} 
                    setIsSidebarOpen={setIsSidebarOpen} 
                    header={header} 
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}