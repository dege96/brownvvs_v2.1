import React, { useState } from 'react';
import { FaGraduationCap, FaChalkboardTeacher, FaUsers, FaCheckCircle } from 'react-icons/fa';
import './CoursesSection.css';

const CoursesSection = () => {
    const [expandedCard, setExpandedCard] = useState(null);
    
    const courses = [
        {
            icon: <FaUsers />,
            title: "Grundläggande kurser",
            description: "För dig som vill förstå grunderna i värmesystem och injustering. Praktiska kurser med fokus på grundläggande koncept och vanliga utmaningar.",
            targetAudience: [
                "Är medlem i en BRF-styrelse eller fastighetsägare.",
                "Vill lära dig grunderna i VVS-system",
                "Söker praktisk kunskap om injustering"
            ]
        },
        {
            icon: <FaChalkboardTeacher />,
            title: "Fördjupningskurser",
            description: "Fördjupande kurser för dig som vill gå på djupet inom injustering och projektering. Vi fokuserar på beräkningar och optimering av system.",
            targetAudience: [
                "Arbetar professionellt med VVS",
                "Behöver kunskap om k-värden och injusteringsberäkningar",
                "Vill optimera projekteringshandlingar"
            ]
        },
        {
            icon: <FaGraduationCap />,
            title: "Specialkurser med EMTF",
            description: "Avancerade kurser i samarbete med Energi- och Miljötekniska Föreningen (EMTF). Erbjuds 4-6 gånger per år.",
            targetAudience: [
                "Vill ligga i framkant inom VVS-teknik",
                "Söker specialistkunskap",
                "Är intresserad av tekniska innovationer",
                "Vill nätverka med branschexperter"
            ]
        }
    ];

    const toggleCard = (index) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    return (
        <section className="courses-section">
            <div className="courses-content">
                <h1>Kurser och Utbildningar</h1>
                <p className="courses-subtitle">
                    Vi erbjuder kurser som ger dig kunskapen att förstå och optimera VVS-system. 
                    Våra utbildningar riktar sig till konsulter, fastighetsägare och andra intresserade.
                </p>

                <div className="courses-grid">
                    {courses.map((course, index) => (
                        <div key={index} className="course-card" onClick={() => toggleCard(index)}>
                            <div className="course-icon">
                                {course.icon}
                            </div>
                            <h3>{course.title}</h3>
                            <p className={expandedCard === index ? 'expanded' : ''}>
                                {course.description}
                            </p>
                            <div className="target-audience">
                                <h4>Passar dig som:</h4>
                                <ul>
                                    {course.targetAudience.map((target, i) => (
                                        <li key={i}>
                                            <FaCheckCircle className="check-icon" />
                                            {target}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoursesSection; 