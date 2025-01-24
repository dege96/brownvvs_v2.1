import React, { useEffect } from 'react';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import Footer from '../components/Footer/Footer';

const TjansterPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="tjanster-page">
            <div className="page-content">
                <ServicesSection />
            </div>
            <Footer />
        </div>
    );
};

export default TjansterPage; 