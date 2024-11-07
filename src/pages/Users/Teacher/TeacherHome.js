import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/common.css';  // Import CSS chung cho cả hệ thống
import '../../styles/teacher.css';  // Import CSS dành riêng cho giáo viên

const TeacherHome = () => {
    const navigate = useNavigate();

    // Hàm điều hướng đến trang cụ thể
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="teacher-container">
            <h1 className="teacher-title">Chào mừng Giáo viên!</h1>
            
            <div className="teacher-buttons">
                <button 
                    className="teacher-button"
                    onClick={() => handleNavigation('/view-classes')}
                >
                    Xem Danh Sách Lớp Học
                </button>
                
                <button 
                    className="teacher-button"
                    onClick={() => handleNavigation('/view-online-class')}
                >
                    Xem Phòng Học Trực Tuyến
                </button>
                
                <button 
                    className="teacher-button"
                    onClick={() => handleNavigation('/create-online-class')}
                >
                    Tạo Phòng Học Trực Tuyến
                </button>
                
                <button 
                    className="teacher-button"
                    onClick={() => handleNavigation('/view-attendance')}
                >
                    Xem Điểm Danh
                </button>
                
                <button 
                    className="teacher-button"
                    onClick={() => handleNavigation('/mark-attendance')}
                >
                    Điểm Danh
                </button>
                
                <button 
                    className="teacher-button"
                    onClick={() => handleNavigation('/create-assignment')}
                >
                    Tạo Bài Tập Mới
                </button>
                
                <button 
                    className="teacher-button"
                    onClick={() => handleNavigation('/view-assignments')}
                >
                    Xem Bài Tập Đã Giao
                </button>
                
                <button 
                    className="teacher-button"
                    onClick={() => handleNavigation('/grade-assignments')}
                >
                    Chấm Bài Tập
                </button>
                
                <button 
                    className="teacher-button"
                    onClick={() => handleNavigation('/create-quiz')}
                >
                    Tạo Câu Hỏi Trắc Nghiệm
                </button>
                
                <button 
                    className="teacher-button"
                    onClick={() => handleNavigation('/view-quiz-results')}
                >
                    Xem Kết Quả Trắc Nghiệm
                </button>
            </div>
        </div>
    );
};

export default TeacherHome;
