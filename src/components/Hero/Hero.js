import React, { useEffect } from 'react';
import './Hero.css';

const Hero = () => {
    useEffect(() => {
        const handleScroll = () => {
            const hero = document.querySelector('.hero');
            const scrollY = window.scrollY;
            const maxScroll = 616;
            const minWidth = 100;
            const maxWidth = 100.1;
            
            if (scrollY <= maxScroll) {
                const widthDiff = maxWidth - minWidth;
                const scrollProgress = scrollY / maxScroll;
                const currentWidth = minWidth + (widthDiff * scrollProgress);
                
                hero.style.transition = 'width 0.1s ease-out';
                hero.style.width = `${currentWidth}%`;
                
                const parallaxValue = scrollY * 0.2;
                hero.style.backgroundPosition = `center ${parallaxValue}px`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="hero" id="hero">
            <div className="hero-blur-vector"></div>
            <div className="hero-content">
                <h1>Experter på hållbara VVS-lösningar</h1>
                <ul>
                    <li style={{'--item-index': 0}}>Över 30 års erfarenhet</li>
                    <li style={{'--item-index': 1}}>Specialist inom injustering av värmesystem</li>
                    <li style={{'--item-index': 2}}>Högkvalitativa lösningar för både nya och befintliga fastigheter</li>
                </ul>
                <div className="cta-container">
                    <a href="#contact">Kontakta oss</a>
                    <a href="/tjanster" className="secondary-cta">Vad vi erbjuder</a>
                </div>
            </div>
        </div>
    );
};

export default Hero; 