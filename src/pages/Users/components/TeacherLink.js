// src/components/TeacherLinks.js
import React from 'react';
import { Link } from 'react-router-dom';

const TeacherLinks = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/teacher/assignments">Quản lý bài tập</Link>
                </li>
                <li>
                    <Link to="/teacher/students">Xem thông tin sinh viên</Link>
                </li>
                <li>
                    <Link to="/teacher/attendance">Điểm danh</Link>
                </li>
                <li>
                    <Link to="/teacher/quizzes">Quản lý quiz</Link>
                </li>
                {/* Thêm các liên kết khác nếu cần */}
            </ul>
        </nav>
    );
};

export default TeacherLinks;
