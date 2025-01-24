import React, { useState } from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
    const [expandedCard, setExpandedCard] = useState(null);

    const services = [
        {
            title: "Projektering",
            description: "Jag arbetar med projektering inom flera områden, inklusive värme, kyla, tappvatten, värmeåtervinning och spillvatten. Mitt arbete omfattar även projektering av stambyten, det vill säga utbyte av VA-system. Jag projekterar fjärrvärmeundercentraler och värmepumpsanläggningar, både när det gäller nya installationer och utbyte av befintliga system. Majoriteten av mina projekt rör befintliga fastigheter, men jag tar också ibland på mig uppdrag som involverar projektering för nybyggnationer. Vid behov kan jag ta fram ramar för totalentreprenader samt skapa förfrågningsunderlag för utförandeentreprenader. I mitt arbete använder jag Magicad som CAD-verktyg, i kombination med Autocad, för att säkerställa noggranna lösningar."
        },
        {
            title: "Injustering",
            description: "Vi utför injusteringsberäkningar för befintliga system och tar fram förfrågningsunderlag för ventilbyten, injusteringar och stambyten av VA-system. Vi har särskild expertis inom injustering av värme-, kyla- och VVC-system (varmvattencirkulation), som ofta kan vara problematiska att få rätt balans i."
        },
        {
            title: "Granskning",
            description: "Vi granskar handlingar för värme-, kyla- och VA-anläggningar ur ett injusteringsperspektiv för att säkerställa att systemen uppfyller kraven och är rätt balanserade. Genom att bidra tidigt i processen kan vi upptäcka och åtgärda eventuella brister innan projektet är avslutat, vilket sparar både tid och resurser."
        },
        {
            title: "Projektledning",
            description: "Vi erbjuder projektledning med särskilt fokus på VVS-projekt där vi har varit involverade i framtagandet av förfrågningsunderlaget. Vi tar även uppdrag där det behövs kvalificerad projektledning för att säkerställa att tidigare genomförda projekt uppfyller alla krav och fungerar optimalt."
        },
        {
            title: "Utredningar",
            description: "Vi erbjuder kvalificerade utredningar och systematisk felsökning av värme-, kyla- och VVC-system. Med vår expertis och moderna mätmetoder identifierar och åtgärdar vi effektivt komplexa driftproblem för att optimera systemens funktion och prestanda."
        }
    ];

    const handleCardClick = (event) => {
        const card = event.currentTarget;
        card.classList.toggle('expanded');
    };

    return (
        <section className="services-section" id="services">
            <h2 className="section-title section-title-lightblue">Våra Tjänster</h2>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div 
                        key={index}
                        className={`service-card ${expandedCard === index ? 'expanded' : ''} ${expandedCard !== null && expandedCard !== index ? 'faded' : ''}`}
                        onClick={handleCardClick}
                    >
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesSection; 