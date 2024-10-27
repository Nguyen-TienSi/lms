// ClassDetail.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Teacher/ClassDetail.css';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import RoomDetails from '../../components/Teacher/RoomDetails';
import AssignmentsList from '../../components/Teacher/AssignmentsList';

const ClassDetail = () => {
    return (
        <div>
            <Header />
            <div className="container class-detail">
                <div className="sidebar-menu">
                    <ul>
                        <li><Link to="info" className="menu-link">Thông Tin Lớp Học</Link></li>
                        <li><Link to="assignments" className="menu-link">Bài Tập</Link></li>
                        <li><Link to="room" className="menu-link">Phòng Học</Link></li>
                        <li><Link to="attendance" className="menu-link">Điểm Danh</Link></li>
                        <li><Link to="grades" className="menu-link">Điểm</Link></li>
                    </ul>
                </div>

                <div className="content-area">
                    <div>
                        <h2>Thông Tin Lớp Học</h2>
                        <p>Đây là thông tin tổng quan về lớp học, bao gồm thông tin giáo viên, thời gian học, và các yêu cầu khác.</p>
                    </div>

                    {/* Phần bài tập */}
                    <AssignmentsList />

                    {/* Phần phòng học */}
                    <RoomDetails />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ClassDetail;
