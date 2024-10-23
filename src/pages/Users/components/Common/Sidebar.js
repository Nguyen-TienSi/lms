import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/common.css';  // Import CSS chung cho cả hệ thống

const Sidebar = () => {
    return (
        <aside className="common-sidebar">
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/profile">Hồ Sơ</Link></li>
                <li><Link to="/settings">Cài Đặt</Link></li>
                <li><Link to="/logout">Đăng Xuất</Link></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
