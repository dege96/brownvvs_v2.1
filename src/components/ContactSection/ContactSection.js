import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { BsTelephone } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { BiTime } from 'react-icons/bi';
import './ContactSection.css';

const ContactSection = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">
                <div className="contact-info">
                    <h2>Kontakta oss</h2>
                    <p className="contact-subtitle">Hör av dig till oss, så svarar vi inom kort!</p>
                    
                    <div className="contact-details">
                        <div className="contact-item">
                            <IoLocationOutline className="contact-icon" />
                            <div className="contact-text">
                                <a href="https://maps.app.goo.gl/SzoMteSxio2Khg1V7" target="_blank" rel="noopener noreferrer">
                                    <p>Pilkgatan 15</p>
                                    <p>133 43 Saltsjöbaden</p>
                                    <p>Stockholm</p>
                                </a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <BsTelephone className="contact-icon" />
                            <div className="contact-text">
                                <p>070-899 57 83</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <HiOutlineMail className="contact-icon" />
                            <div className="contact-text">
                                <a href="mailto:ulrika@brownvvs.se">
                                    <p>ulrika@brownvvs.se</p>
                                </a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <BiTime className="contact-icon" />
                            <div className="contact-text">
                                <p>Måndag - Fredag 8-17</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="map-container">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2039.1876860238892!2d18.2843873!3d59.2785799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f7dd5d9dfffff%3A0x8c62b4517b6b1d2a!2sPilkgatan%2015%2C%20133%2043%20Saltsj%C3%B6baden!5e0!3m2!1ssv!2sse!4v1699372151234!5m2!1ssv!2sse" 
                        width="100%" 
                        height="450" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Brown VVS Location"
                    />
                </div>
            </div>
        </section>
    );
};

export default ContactSection; 