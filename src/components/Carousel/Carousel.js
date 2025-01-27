import React, { useState, useEffect, useCallback } from 'react';
import './Carousel.css';

const Carousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const items = React.Children.toArray(children);

    const handleNext = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % items.length);
    }, [items.length]);

    const handlePrev = () => {
        setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            handleNext();
        }
        if (touchStart - touchEnd < -75) {
            handlePrev();
        }
    };

    // Autoplay
    useEffect(() => {
        const timer = setInterval(handleNext, 5000);
        return () => clearInterval(timer);
    }, [handleNext]);

    return (
        <div className="carousel-container">
            <div 
                className="carousel-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {items}
            </div>
            <div className="carousel-dots">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel; 