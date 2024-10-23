import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/common.css';  // Import CSS chung cho cả hệ thống

const Header = () => {
    return (
        <header className="common-header">
            <div className="logo">
                <Link to="/">My School</Link>
            </div>
            <nav className="nav-links">
                <Link to="/teacher-home">Trang Giáo Viên</Link>
                <Link to="/student-home">Trang Học Sinh</Link>
                <Link to="/about">Giới Thiệu</Link>
            </nav>
        </header>
    );
};

export default Header;
