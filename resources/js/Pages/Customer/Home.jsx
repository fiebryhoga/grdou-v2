import React from "react";
import { Head, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/GuestLayout"; 

import Hero from "@/Components/Customer/Sections/Home/HeroSection";
import LayananSection from "@/Components/Customer/Sections/Home/LayananSection";
import KeunggulanSection from "@/Components/Customer/Sections/Home/KeunggulanSection";
import TestimonialSection from "@/Components/Customer/Sections/Home/TestimonialSection";

export default function Home({ produks, testimonials }) {
    const { website_config } = usePage().props;
    
    const pageTitle = website_config?.title 
        ? `${website_config.title} - Jasa Sablon & Konveksi Profesional` 
        : "Jasa Sablon & Konveksi Profesional";

    return (
        <>
            <Head title={pageTitle} />
            
            <Hero />
            <LayananSection produks={produks} />
            <KeunggulanSection />
            <TestimonialSection testimonials={testimonials} />
        </>
    );
}

Home.layout = (page) => <Layout children={page} />;