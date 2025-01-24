import React, { useEffect } from 'react';
import CoursesSection from '../components/CoursesSection/CoursesSection';
import Footer from '../components/Footer/Footer';

const CoursesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="courses-page">
            <CoursesSection />
            <Footer />
        </div>
    );
};

export default CoursesPage; 