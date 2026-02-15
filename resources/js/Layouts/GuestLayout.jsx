import React from "react";
import Navbar from "@/Components/Customer/Layouts/Navbar";
import Footer from "@/Components/Customer/Layouts/Footer";
import { Head } from "@inertiajs/react";

const GuestLayout = ({ children, title }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-slate-900 selection:bg-blue-100 selection:text-blue-700">
            {/* Set Title Browser Tab otomatis jika ada props title */}
            {title && <Head title={title} />}

            <Navbar />

            {/* Main Content dengan flex-grow agar Footer terdorong ke bawah jika konten sedikit */}
            <main className="flex-grow w-full">
                {children}
            </main>
            
            <Footer />
        </div>
    );
};

export default GuestLayout;