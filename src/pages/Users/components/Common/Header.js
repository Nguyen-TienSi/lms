import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import CSS riêng cho Header

class Header extends Component {
    render() {
        return (
            <header className="common-header">
                <div className="logo">
                        <Link to="/teacherhome">Trường Của Tôi</Link>
                    </div>
                <div className='navbar'>
                    <div className="auth-support">
                    <span className="support-phone">0123456789</span>
                    <Link to="/login" className="login-link">Đăng Nhập</Link>
                    <Link to="/register" className="register-link">Đăng Ký</Link>
                </div>
                    <nav className="nav-links">
                        <Link to="/teacherhome">Trang chủ</Link>
                        <Link to="/create-assignment">Thêm Bài Tập</Link>
                        <Link to="/about">Giới Thiệu</Link>
                        <Link to="/contact">Liên Hệ</Link>
                        <Link to="/login">Đăng Nhập</Link>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
