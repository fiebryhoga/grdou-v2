// resources/js/Pages/Customer/Home.jsx
import React from "react";
import { Head, usePage } from "@inertiajs/react";
// Sesuaikan path Layout dengan struktur project Anda (misal: GuestLayout)
import Layout from "@/Layouts/GuestLayout"; 

import Hero from "@/Components/Customer/Sections/Home/HeroSection";
import LayananSection from "@/Components/Customer/Sections/Home/LayananSection";
import KeunggulanSection from "@/Components/Customer/Sections/Home/KeunggulanSection";
import TestimonialSection from "@/Components/Customer/Sections/Home/TestimonialSection";
// Komponen di bawah ini harus dibuat (bahkan jika isinya kosong) agar tidak error
// import ClientsSection from "@/Components/Home/ClientsSection";
// import LayananSection from "@/Components/Home/LayananSection";
// import TestimonialSection from "@/Components/Home/TestimonialSection";
// import KeunggulanSection from "@/Components/Home/KeunggulanSection";

export default function Home({ produks, testimonials }) {
    // Mengambil props global jika ada
    const { keunggulans } = usePage().props;
    
    return (
        <>
            <Head title="Jasa Sablon & Konveksi Profesional" />
            
            {/* Bagian Hero */}
            <Hero />
            <LayananSection />
            <KeunggulanSection/>

            <TestimonialSection/>
        </>
    );
}

// Mendefinisikan Layout Persisten
Home.layout = (page) => <Layout children={page} />;