import React from 'react';
import Carousel from '../Carousel/Carousel';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
    const testimonials = [
        {
            text: "Efter att ha anlitat dem för injustering av vårt värmesystem har vi sett en markant förbättring i energieffektiviteten. Deras tekniska kompetens och professionella approach överträffade våra förväntningar.",
            author: "Anders Bergström",
            company: "Fastighets AB Centrum, Västerås",
            image: "/images/BrownBlue.png"
        },
        {
            text: "Vi har samarbetat med teamet i flera stora projekt och är mycket nöjda med deras VVS-projektering. Deras förmåga att hitta innovativa lösningar har varit avgörande för projektens framgång.",
            author: "Maria Lindqvist",
            company: "Byggbolaget Norr AB, Umeå",
            image: "/images/BrownBlue.png"
        }
    ];

    return (
        <section className="testimonials-section" id="testimonials">
            <h2 className="section-title">Vad våra kunder säger</h2>
            <div className="testimonials-container">
                <Carousel>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="testimonial-text">
                                <p>"{testimonial.text}"</p>
                            </div>
                            <div className="testimonial-author">
                                <div className="testimonial-author-image">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.author} 
                                    />
                                </div>
                                <div className="testimonial-author-text">
                                    <strong>{testimonial.author}</strong>
                                    <div>{testimonial.company}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default TestimonialsSection; 