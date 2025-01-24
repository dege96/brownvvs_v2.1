import React from 'react';
import './Footer.css';

const Footer = () => {
    const footerGroups = [
        {
            title: "Adress",
            content: "Pilkgatan 15\n133 43 Saltsjöbaden",
            link: "https://maps.app.goo.gl/SzoMteSxio2Khg1V7"
        },
        {
            title: "Telefon",
            content: "070 825 25 93",
            link: "tel:0708252593"
        },
        {
            title: "E-post",
            content: "Ulrika@brownvvs.se",
            link: "mailto:Ulrika@brownvvs.se"
        }
    ];

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-info">
                    {footerGroups.map((group, index) => (
                        <div key={index} className="footer-group">
                            <strong>{group.title}</strong>
                            <p className="linkText">
                                <a href={group.link} target={group.title === "Adress" ? "_blank" : undefined}>
                                    {group.content.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            {i < group.content.split('\n').length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </a>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer; 