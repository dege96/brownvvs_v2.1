import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ScrollLink from '../common/ScrollLink';
import './Header.css';

const SECTIONS = ['about', 'testimonials', 'contact'];
const SCROLL_THRESHOLD = 50;

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const location = useLocation();
    const navigate = useNavigate();
    
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    const handleLogoClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate('/');
        }
    };

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD);

        if (location.pathname === '/') {
            const current = SECTIONS.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (current) {
                setActiveSection(current);
            }
        }
    }, [location.pathname]);

    useEffect(() => {
        if (location.pathname === '/tjanster') {
            setActiveSection('');
        }
    }, [location.pathname]);

    const handleClickOutside = useCallback((event) => {
        if (isMenuOpen && 
            menuRef.current && 
            !menuRef.current.contains(event.target) &&
            !hamburgerRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    }, [isMenuOpen]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleScroll, handleClickOutside]);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={`${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <a href="/" className="logo" onClick={handleLogoClick}>
                <img src='/images/LogoText2.png' alt="BROWN VVS" />
            </a>
            <div 
                ref={hamburgerRef}
                className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav ref={menuRef} className={isMenuOpen ? 'active' : ''}>
                {SECTIONS.map(section => 
                    section !== 'contact' ? (
                        <ScrollLink 
                            key={section}
                            to={section}
                            className={location.pathname === '/' && activeSection === section ? 'active' : ''}
                            onClick={closeMenu}
                        >
                            {section === 'about' ? 'Om oss' : 
                             'Referenser'}
                        </ScrollLink>
                    ) : null
                )}
                <Link 
                    to="/tjanster" 
                    className={location.pathname === '/tjanster' ? 'active' : ''}
                    onClick={closeMenu}
                >
                    Tjänster
                </Link>
                <Link 
                    to="/kurser" 
                    className={location.pathname === '/kurser' ? 'active' : ''}
                    onClick={closeMenu}
                >
                    Kurser
                </Link>
                <ScrollLink to="contact" className="nav-cta" onClick={closeMenu}>
                    Kontakta oss
                </ScrollLink>
            </nav>
        </header>
    );
};

export default Header; 