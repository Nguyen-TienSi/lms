import React from 'react';
import '../../styles/Footer.css';  // Import CSS chung cho cả hệ thống

const Footer = () => {
    return (
        <footer className="common-footer">
            <p>© 2024 My School. All Rights Reserved.</p>
            <p>
                Liên hệ: 
                <a href="mailto:support@myschool.com">support@myschool.com</a>
            </p>
        </footer>
    );
};

export default Footer;
