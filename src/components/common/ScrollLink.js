import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ScrollLink = ({ to, children, className = '', onClick = () => {} }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = async (sectionId) => {
        if (location.pathname !== '/') {
            // Om vi är på en annan sida, navigera till home med hash
            navigate('/#' + sectionId);
        } else {
            // Om vi redan är på home, scrolla bara
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        onClick();
    };

    return (
        <a
            href={`#${to}`}
            className={className}
            onClick={(e) => {
                e.preventDefault();
                scrollToSection(to);
            }}
        >
            {children}
        </a>
    );
};

export default ScrollLink; 