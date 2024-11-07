// src/pages/Users/pages/Student/StudentHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/common.css';  // Import CSS chung cho cả hệ thống
import '../../../styles/Student/student.css';  // Import CSS dành riêng cho sinh viên

const StudentHome = () => {
    const navigate = useNavigate();

    // Hàm điều hướng đến trang cụ thể
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="student-container">
            <h1 className="student-title">Chào mừng Sinh viên!</h1>
            
            <div className="student-buttons">
                <button 
                    className="student-button"
                    onClick={() => handleNavigation('/view-subjects')}
                >
                    Xem Môn Học
                </button>
                
                <button 
                    className="student-button"
                    onClick={() => handleNavigation('/view-online-class')}
                >
                    Xem Phòng Học Trực Tuyến
                </button>
                
                <button 
                    className="student-button"
                    onClick={() => handleNavigation('/view-assignments')}
                >
                    Xem Bài Tập
                </button>
                
                <button 
                    className="student-button"
                    onClick={() => handleNavigation('/submit-assignment')}
                >
                    Nộp Bài Tập
                </button>
                
                <button 
                    className="student-button"
                    onClick={() => handleNavigation('/view-quizzes')}
                >
                    Xem Bài Kiểm Tra
                </button>
                
                <button 
                    className="student-button"
                    onClick={() => handleNavigation('/take-quiz')}
                >
                    Làm Bài Kiểm Tra
                </button>
                
                <button 
                    className="student-button"
                    onClick={() => handleNavigation('/view-quiz-results')}
                >
                    Xem Kết Quả Bài Kiểm Tra
                </button>
                
                <button 
                    className="student-button"
                    onClick={() => handleNavigation('/view-attendance')}
                >
                    Xem Điểm Danh
                </button>
            </div>
        </div>
    );
};

export default StudentHome;
