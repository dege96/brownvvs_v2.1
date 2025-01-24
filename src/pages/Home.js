import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import StatsSection from '../components/StatsSection/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection/TestimonialsSection';
import ContactSection from '../components/ContactSection/ContactSection';
import Footer from '../components/Footer/Footer';

function Home() {
    const location = useLocation();

    useEffect(() => {
        // Kolla om vi har en hash i URL:en och att vi kommer från en annan sida
        if (location.hash && location.key) {
            // Vänta tills sidan har laddats
            requestAnimationFrame(() => {
                const id = location.hash.slice(1);
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ 
                        behavior: 'instant',
                        block: 'start'
                    });
                }
            });
        }
    }, [location]);

    return (
        <div className="home">
            <section id="hero">
                <Hero />
            </section>

            <section id="about">
                <StatsSection />
            </section>

            <section id="testimonials">
                <TestimonialsSection />
            </section>

            <section id="contact">
                <ContactSection />
            </section>

            <Footer />
        </div>
    );
}

export default Home; 