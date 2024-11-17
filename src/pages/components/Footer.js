import React from 'react';
import '../../styles/common/Footer.css';

const Footer = () => {
    return (
        <footer className="common-footer">
            <p>&copy; 2024 My School. All Rights Reserved.</p>
            <p>
                Liên hệ: &nbsp;
                <a href="mailto:support@myschool.com">support@myschool.com</a>
            </p>
        </footer>
    );
};

export default Footer;
