import React, { useState, useEffect, useRef } from 'react';
import './AboutSection.css';

const StatsSection = () => {
    const [activeCircle, setActiveCircle] = useState(1);
    const [activeMobileTab, setActiveMobileTab] = useState('brown');
    const [isHovering, setIsHovering] = useState(false);
    const [lastHoveredDot, setLastHoveredDot] = useState('dot1');
    const tooltipRef = useRef(null);
    const animationTimeoutRef = useRef(null);

    const handleCircleClick = (circleNumber) => {
        setActiveCircle(circleNumber);
        
        // Ta bort tooltip när man klickar på "Om företaget" (cirkel 1)
        if (circleNumber === 1) {
            tooltipRef.current?.classList.remove('visible');
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
            setIsHovering(false);
            
            // Återställ alla färger
            const elements = document.querySelectorAll('.cls-1, .cls-2');
            elements.forEach(element => {
                element.style.fill = '#f1f2f2';
            });

            const paths = ['path1', 'path2', 'path3'].map(id => document.getElementById(id));
            const dots = ['dot1', 'dot2', 'dot3', 'dot4'].map(id => document.getElementById(id));

            paths.forEach(path => {
                if (path) path.style.fill = 'var(--bg-light-beige)';
            });

            dots.forEach(dot => {
                if (dot) dot.style.fill = 'var(--bg-light-beige)';
            });
        }
    };

    const handleMobileTabClick = (contentType) => {
        setActiveMobileTab(contentType);
    };

    const tooltips = {
        'dot1': '1991 började jag min karriär som injusterare av rörsystem på Värmex Konsult AB',
        'dot2': '1992-1993 vidareutbildade mig inom uppvärmningsteknik på STI parallellt med mitt arbete',
        'dot3': 'Sedan dess har jag arbetat som konstruktör på flera ledande företag som Torsten Palmqvist AB, Grontmij och Energiverket',
        'dot4': '2022 startade jag Brown VVS för att kunna erbjuda spetskompetens inom VVS-projektering och injustering'
    };

    const animateDot = (dotId, shouldShowTooltip = true) => {
        if (isHovering) return;

        // Kontrollera att alla nödvändiga element finns
        const dot = document.getElementById(dotId);
        const dot1 = document.getElementById('dot1');
        const dot2 = document.getElementById('dot2');
        const dot3 = document.getElementById('dot3');
        const dot4 = document.getElementById('dot4');
        const path1 = document.getElementById('path1');
        const path2 = document.getElementById('path2');
        const path3 = document.getElementById('path3');

        // Om något av de kritiska elementen saknas, avbryt animationen
        if (!dot || !dot1 || !dot2 || !dot3 || !dot4 || !path1 || !path2 || !path3) {
            return;
        }

        // Återställ alla färger först
        const elements = document.querySelectorAll('.cls-1, .cls-2');
        elements.forEach(element => {
            if (element) element.style.fill = '#f1f2f2';
        });

        const paths = [path1, path2, path3];
        const dots = [dot1, dot2, dot3, dot4];

        paths.forEach(path => {
            if (path) path.style.fill = 'var(--bg-light-beige)';
        });

        dots.forEach(d => {
            if (d) d.style.fill = 'var(--bg-light-beige)';
        });

        // Animera den aktuella doten
        dot.style.fill = 'var(--primary-orange)';

        // Hantera färgändringar för olika dots
        if (dotId === 'dot2') {
            path1.style.fill = 'var(--primary-orange)';
            dot1.style.fill = 'var(--primary-orange)';
        } else if (dotId === 'dot3') {
            dot1.style.fill = 'var(--primary-orange)';
            dot2.style.fill = 'var(--primary-orange)';
            path1.style.fill = 'var(--primary-orange)';
            path2.style.fill = 'var(--primary-orange)';
        } else if (dotId === 'dot4') {
            dot1.style.fill = 'var(--primary-orange)';
            dot2.style.fill = 'var(--primary-orange)';
            dot3.style.fill = 'var(--primary-orange)';
            path1.style.fill = 'var(--primary-orange)';
            path2.style.fill = 'var(--primary-orange)';
            path3.style.fill = 'var(--primary-orange)';
        }

        // Uppdatera text färg
        const texts = document.querySelectorAll('#Layer_1 text');
        texts.forEach((text, index) => {
            if (text && index === Object.keys(tooltips).indexOf(dotId)) {
                text.style.transition = 'all 0.9s ease';
                text.style.fill = 'var(--primary-orange)';
            }
        });

        // Hantera tooltip
        if (shouldShowTooltip && tooltipRef.current && dot) {
            tooltipRef.current.textContent = tooltips[dotId];
            const rect = dot.getBoundingClientRect();
            const statsSection = document.querySelector('.stats-section');
            const statsSectionRect = statsSection.getBoundingClientRect();
            
            tooltipRef.current.style.left = `${rect.left - statsSectionRect.left + (rect.width / 2)}px`;
            tooltipRef.current.style.top = `${rect.top - statsSectionRect.top}px`;
            tooltipRef.current.classList.add('visible');
        }
    };

    const startAnimation = () => {
        if (isHovering) return;

        const dots = ['dot1', 'dot2', 'dot3', 'dot4'];
        let currentIndex = dots.indexOf(lastHoveredDot);
        if (currentIndex === -1) currentIndex = 0;

        const animate = () => {
            if (isHovering) return;

            const currentDot = dots[currentIndex];
            animateDot(currentDot, true);

            animationTimeoutRef.current = setTimeout(() => {
                if (!isHovering) {
                    currentIndex = (currentIndex + 1) % dots.length;
                    if (currentIndex === 0) {
                        const elements = document.querySelectorAll('.cls-1, .cls-2');
                        elements.forEach(element => {
                            element.style.fill = '#f1f2f2';
                        });
                        tooltipRef.current?.classList.remove('visible');
                        setTimeout(() => {
                            if (!isHovering) animate();
                        }, 6000);
                    } else {
                        animate();
                    }
                }
            }, 6000);
        };

        animate();
    };

    const handleHover = (event, dotId) => {
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }
        setIsHovering(true);
        setLastHoveredDot(dotId);
        animateDot(dotId, true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
        
        // Återställ alla färger
        const elements = document.querySelectorAll('.cls-1, .cls-2');
        elements.forEach(element => {
            element.style.fill = '#f1f2f2';
        });

        const paths = ['path1', 'path2', 'path3'].map(id => document.getElementById(id));
        const dots = ['dot1', 'dot2', 'dot3', 'dot4'].map(id => document.getElementById(id));

        paths.forEach(path => {
            if (path) path.style.fill = 'var(--bg-light-beige)';
        });

        dots.forEach(dot => {
            if (dot) dot.style.fill = 'var(--bg-light-beige)';
        });

        // Ta bort tooltip med en fördröjning för att matcha animationen
        setTimeout(() => {
            tooltipRef.current?.classList.remove('visible');
        }, 300);

        // Starta om animationen efter en kort fördröjning
        setTimeout(startAnimation, 1000);
    };

    useEffect(() => {
        // Hantera cirkel-klick
        const circles = document.querySelectorAll('.stat-circle');
        const statsText = document.querySelector('.stats-text p');
        const statsTitle = document.querySelector('.stats-text h1');

        // Lägg till hover-hantering för dots
        const dots = ['dot1', 'dot2', 'dot3', 'dot4'];
        dots.forEach(dotId => {
            const dot = document.getElementById(dotId);
            if (dot) {
                dot.addEventListener('mouseenter', (e) => handleHover(e, dotId));
                dot.addEventListener('mouseleave', handleMouseOut);
            }
            // Lägg även till hover för texten
            const textId = `text${dotId.slice(-1)}`;
            const text = document.getElementById(textId);
            if (text) {
                text.addEventListener('mouseenter', (e) => handleHover(e, dotId));
                text.addEventListener('mouseleave', handleMouseOut);
            }
        });

        circles.forEach((circle, index) => {
            if (!circle.classList.contains('bottom')) {
                circle.addEventListener('click', () => {
                    circles.forEach(c => c.classList.remove('active'));
                    circle.classList.add('active');

                    if (statsText && statsTitle) {
                        statsText.innerHTML = circle.dataset.text;
                        statsTitle.textContent = circle.dataset.title;
                    }

                    // Hantera bottom circle content
                    const bottomCircle = document.querySelector('.stat-circle.bottom');
                    if (bottomCircle) {
                        bottomCircle.querySelectorAll('.content').forEach(content => {
                            content.classList.remove('active');
                        });
                        const nextContent = bottomCircle.querySelector(`[data-for="circle-${index + 1}"]`);
                        if (nextContent) {
                            nextContent.classList.add('active');
                        }
                    }
                });
            }
        });

        // Starta animationen om vi är på rätt sektion
        const circle2 = document.getElementById('circle-2');
        if (circle2 && activeCircle === 2) {
            startAnimation();
        }

        return () => {
            // Cleanup
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
            // Ta bort event listeners
            circles.forEach(circle => {
                if (!circle.classList.contains('bottom')) {
                    circle.removeEventListener('click', () => {});
                }
            });
            // Ta bort hover event listeners
            dots.forEach(dotId => {
                const dot = document.getElementById(dotId);
                if (dot) {
                    dot.removeEventListener('mouseenter', (e) => handleHover(e, dotId));
                    dot.removeEventListener('mouseleave', handleMouseOut);
                }
                const textId = `text${dotId.slice(-1)}`;
                const text = document.getElementById(textId);
                if (text) {
                    text.removeEventListener('mouseenter', (e) => handleHover(e, dotId));
                    text.removeEventListener('mouseleave', handleMouseOut);
                }
            });
        };
    }, [isHovering, lastHoveredDot, activeCircle]);

    return (
        <section className="stats-section" id="om-oss">
            <div className="section-header">
                <h1 className="section-title">Om oss</h1>
            </div>
            <div className="stats-text">
                <h1>Brown VVS</h1>
                <p>Med rötterna i VVS-branschen sedan 1991 har Brown VVS vuxit till en pålitlig partner för fastighetsägare, byggföretag och andra aktörer i Stockholm. Vi kombinerar gedigen erfarenhet med en passion för hållbara och effektiva lösningar.</p>
            </div>
            <div className="mobile-stats">
                <div className="mobile-header">
                    <div 
                        className={`mobile-header-item ${activeMobileTab === 'brown' ? 'active' : ''}`}
                        onClick={() => handleMobileTabClick('brown')}
                        data-content="brown"
                    >
                        <div className="title">Om företaget</div>
                        <div className="subtitle">Brown VVS</div>
                    </div>
                    <div 
                        className={`mobile-header-item ${activeMobileTab === 'ulrika' ? 'active' : ''}`}
                        onClick={() => handleMobileTabClick('ulrika')}
                        data-content="ulrika"
                    >
                        <div className="title">Om mig</div>
                        <div className="subtitle">Ulrika Brown</div>
                    </div>
                </div>
                
                <div className={`mobile-content ${activeMobileTab === 'brown' ? 'active' : ''}`} data-content="brown">
                    <h2>Brown VVS</h2>
                    <p>Med rötterna i VVS-branschen sedan 1991 har Brown VVS vuxit till en pålitlig partner för fastighetsägare, byggföretag och andra aktörer i Stockholm. Vi kombinerar gedigen erfarenhet med en passion för hållbara och effektiva lösningar.</p>
                    <img src="/images/logo.png" alt="Brown VVS Logo" className="logo-image" />
                </div>
                
                <div className={`mobile-content ${activeMobileTab === 'ulrika' ? 'active' : ''}`} data-content="ulrika">
                    <h1>Min resa</h1>
                    <ul>
                        <li>Började min karriär 1991 som injusterare av rörsystem på Värmex Konsult AB</li>
                        <li>Vidareutbildade mig inom uppvärmningsteknik på STI 1992-1993 parallellt med mitt arbete</li>
                        <li>Har arbetat som konstruktör på flera ledande företag som Torsten Palmqvist AB, Grontmij och Energiverket</li>
                        <li>Startade 2022 Brown VVS för att kunna erbjuda spetskompetens inom VVS-projektering och injustering</li>
                    </ul>
                    <div className="bottom-image">
                        <img src="/images/MomentsByJenny_13_compressed.jpg" alt="Ulrika Brown" />
                    </div>
                </div>
            </div>
            <div className="stats-circles">
                <div 
                    className={`stat-circle ${activeCircle === 1 ? 'active' : ''}`}
                    onClick={() => handleCircleClick(1)}
                    data-text="Med rötterna i VVS-branschen sedan 1991 har Brown VVS vuxit till en pålitlig partner för fastighetsägare, byggföretag och andra aktörer i Stockholm. Vi kombinerar gedigen erfarenhet med en passion för hållbara och effektiva lösningar."
                    data-title="Brown VVS"
                >
                    <div className="stat-number">Om företaget</div>
                    <div className="stat-label">Brown VVS</div>
                </div>
                <div 
                    className={`stat-circle ${activeCircle === 2 ? 'active' : ''}`}
                    id="circle-2"
                    onClick={() => handleCircleClick(2)}
                    data-text='Med över 30 års erfarenhet i VVS-branschen har jag byggt upp en gedigen kompetens:<p><br>
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="50 50 1010.9 700.1">
                        <defs>
                            <style>
                                .cls-1 {
                                    fill: #fff;
                                    transition: all 0.7s ease;
                                }
                                .cls-2 {
                                    fill: #fff;
                                    font-family: OpenSansRoman-Bold, "Open Sans";
                                    font-size: 34px;
                                    font-variation-settings: "wght" 300, "wdth" 100;
                                    font-weight: 300;
                                    transition: all 0.7s ease;
                                }
                                .cls-3 {
                                    stroke-miterlimit: 10;
                                    stroke-width: 9px;
                                }
                            </style>
                        </defs>
                        <g id="NEW">
                            <text class="cls-2" transform="translate(159.4 148.2)"><tspan x="0" y="0" xml:space="preserve"> Värmex Konsult AB</tspan></text>
                            <text class="cls-2" transform="translate(760.2 294.5)"><tspan x="0" y="0">STI</tspan></text>
                            <text class="cls-2" transform="translate(98 495.7)"><tspan x="0" y="0">Konstruktör</tspan></text>
                            <text class="cls-2" transform="translate(673.2 671.1)"><tspan x="0" y="0">Brown VVS</tspan></text>
                            <path id="path2" class="cls-1" d="m324.1,459.3c9.4-6.1,18.8-10.2,28.5-13.3,16.7-5.3,33.9-8.9,51.1-12,16-2.9,32-5.6,48.1-7.9,15.7-2.3,31.4-4.1,47.1-6.2,17-2.3,34-4.7,51-6.9,16.2-2.1,32.4-3.9,48.6-6.1,11.4-1.6,22.7-4.3,34.1-5.8,19.8-2.5,39.2-6.7,58.5-11.2,22.7-5.2,45-11.6,65.1-23.9.4-.3,1-.3,1.3-.6,4.4-4.8,9.6-5.5,15.7-2.7-5.6,5.8-12.2,10.3-19.2,13.9-21.9,11.4-45.4,18.1-69.3,23.6-15.3,3.5-30.7,6.7-46.1,9.6-15.3,2.9-30.9,4.8-46.3,7.2-14.7,2.3-29.3,4.8-44,6.9-15.7,2.2-31.6,3.8-47.3,6.2-16.7,2.6-33.4,4.4-50,7.6-14.3,2.8-28.8,4.7-43.2,7.3-23.2,4.3-46.1,9.6-67.8,19.1-2.7,1.2-4.7.6-6.4-.7-2.7-2-5.8-2.8-9.7-4.1Z"/>
                            <path id="path3" class="cls-1" d="m327.6,507.4c4.1-1.6,7.7-3.3,10.5-6.4,1.1-1.2,2.2-1.2,3.9-.4,17.7,7.7,36.5,11.6,55.3,15.2,16.4,3.1,32.8,6.2,49.3,9,12.2,2,24.5,3.4,36.7,5.1,15.8,2.3,31.4,5,47.3,6.8,14.7,1.7,29.3,4,44,6.3,20,3,39.9,6.7,59.8,10.6,18.9,3.8,37.7,7.8,56.2,13.3,13.6,4,27.2,8.2,39.8,15,4.9,2.7,9.7,5.7,14.4,8.7.9.6,2.6,1.6,1.4,3.2-1,1.3-2.4.4-3.5-.3-19.1-12.9-41.2-17.9-63-23.5-18.8-4.8-37.9-7.7-57-10.8-15.6-2.6-31.4-4.7-47.2-6.3-14.3-1.5-28.5-4.4-42.8-5.7-15-1.4-29.9-3.5-44.9-5.3-16.2-2-32.4-4.2-48.5-6.6-17.3-2.6-34.6-4.9-51.6-8.4-19.8-4-39.5-8.5-57.7-17.8-.7-.4-1.3-.9-2.2-1.5Z"/>
                            <path id="path1" class="cls-1" d="m756,319.3c-1.3,5-4.5,6.6-9.2,5.7-13.2-2.5-26.6-3.2-39.9-4.9-8.3-1.1-16.7-1.3-25.1-2.1-11.9-1.2-23.8-2.6-35.6-3.9-9.8-1.1-19.6-1.9-29.3-3.1-11.3-1.5-22.7-2.8-34-4.5-13.4-2-26.8-4-40-6.6-13.8-2.7-27.5-5.9-41.1-9.3-19.8-4.9-39.2-11.1-58.1-18.7-32-12.8-62.4-28.6-89.9-49.5-3.8-2.9-8.2-5.6-10.4-10.5,5.5,3.9,11.2,7.7,16.6,11.9,11.4,8.6,23.7,15.7,36.3,22.5,21.7,11.7,44.3,21.2,67.7,28.8,26.1,8.5,52.7,15,79.7,19.9,15.2,2.8,30.4,5.1,45.8,7.1,15.7,2,31.5,3.7,47.3,5.1,15.7,1.4,31.4,2.9,47.1,3.9,15,1,30.1,2.4,45,4,9,1,18,2.7,27.2,4.2Z"/>
                            <path id="dot2" class="cls-1" d="m789.5,337.3c0,8.3-7.9,16-16.3,15.7-6.7-.2-14.6-8.4-14.8-15.3-.2-7.6,7.5-15.7,15.3-15.6,8.8,0,15.2,6.5,15.8,15.3Z"/>
                            <path id="dot3" class="cls-1" d="m319.7,498.9c-7.6,0-15-7.3-15.1-15,0-6.3,6.9-15.4,15.4-15.2,9,.2,15.9,7.7,15.6,14.8-.3,9.2-7,15.8-16,15.4Z"/>
                            <path id="dot4" class="cls-1" d="m759.9,628.9c-8.7,1.3-14.8-7.2-15.4-14.2-.6-7.9,7.4-15.8,15.5-15.8,8.2,0,15.3,7.1,15.5,15,.2,8.8-7.8,16.4-15.6,15Z"/>
                            <path id="dot1" class="cls-1" d="m329.1,177c9,0,15,5.6,15.7,13.4.9,10.8-8,16.5-15.3,16.5-8.4,0-14.8-6.4-14.8-15,0-8.8,5.9-14.9,14.5-15Z"/>
                        </g>
                    </svg>'
                    data-title="Min resa"
                >
                    <div className="stat-number">Om mig</div>
                    <div className="stat-label">Ulrika Brown</div>
                </div>
                <div className="stat-circle bottom">
                    <div className={`content ${activeCircle === 1 ? 'active' : ''}`} data-for="circle-1">
                        <img src="/images/logo.png" className="logo-image" alt="Company logo" />
                    </div>
                    <div className={`content ${activeCircle === 2 ? 'active' : ''}`} data-for="circle-2">
                        <img src="/images/MomentsByJenny_13_compressed-min.jpg" alt="Ulrika Brown" />
                    </div>
                </div>
            </div>
            <div ref={tooltipRef} className="tooltip" />
        </section>
    );
};

export default StatsSection; 