import React, { useState } from 'react';
import '../../styles/student.css';

// Import các component
import TakeQuiz from './TakeQuiz';
import ViewOnlineClass from './ViewOnlineClassStudent';
import ViewSubjects from './ViewSubjects';
import ViewQuizResults from './ViewQuizResultsStudent';
import ViewAssignments from './StudentViewAssignments';
import ViewQuizzes from './ViewQuizzes';
import ViewAttendance from './ViewAttendanceStudent';
import SubmitAssignment from './SubmitAssignment';

const StudentHome = () => {
    const [selectedMenu, setSelectedMenu] = useState(null);

    // Hàm render component tương ứng dựa trên mục được chọn
    const renderContent = () => {
        switch (selectedMenu) {
            case 'Môn Học':
                return <ViewSubjects />;
            case 'Phòng Học Trực Tuyến':
                return <ViewOnlineClass />;
            case 'Bài Tập':
                return <ViewAssignments />;
            case 'Nộp Bài Tập':
                return <SubmitAssignment />;
            case 'Bài Kiểm Tra':
                return <ViewQuizzes />;
            case 'Làm Bài Kiểm Tra':
                return <TakeQuiz />;
            case 'Kết Quả Bài Kiểm Tra':
                return <ViewQuizResults />;
            case 'Điểm Danh':
                return <ViewAttendance />;
            default:
                return <p>Chọn một mục trong menu để bắt đầu.</p>;
        }
    };

    return (
        <div className="student-home-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h2 className="sidebar-title">Menu</h2>
                <ul className="sidebar-menu">
                    <li className={selectedMenu === 'Môn Học' ? 'active' : ''} onClick={() => setSelectedMenu('Môn Học')}>Môn Học</li>
                    <li className={selectedMenu === 'Phòng Học Trực Tuyến' ? 'active' : ''} onClick={() => setSelectedMenu('Phòng Học Trực Tuyến')}>Phòng Học Trực Tuyến</li>
                    <li className={selectedMenu === 'Bài Tập' ? 'active' : ''} onClick={() => setSelectedMenu('Bài Tập')}>Bài Tập</li>
                    <li className={selectedMenu === 'Nộp Bài Tập' ? 'active' : ''} onClick={() => setSelectedMenu('Nộp Bài Tập')}>Nộp Bài Tập</li>
                    <li className={selectedMenu === 'Bài Kiểm Tra' ? 'active' : ''} onClick={() => setSelectedMenu('Bài Kiểm Tra')}>Bài Kiểm Tra</li>
                    <li className={selectedMenu === 'Làm Bài Kiểm Tra' ? 'active' : ''} onClick={() => setSelectedMenu('Làm Bài Kiểm Tra')}>Làm Bài Kiểm Tra</li>
                    <li className={selectedMenu === 'Kết Quả Bài Kiểm Tra' ? 'active' : ''} onClick={() => setSelectedMenu('Kết Quả Bài Kiểm Tra')}>Kết Quả Bài Kiểm Tra</li>
                    <li className={selectedMenu === 'Điểm Danh' ? 'active' : ''} onClick={() => setSelectedMenu('Điểm Danh')}>Điểm Danh</li>
                </ul>
            </div>

            {/* Nội dung chính */}
            <div className="main-content">
                {/* Hiển thị tiêu đề khi chưa chọn mục nào */}
                {selectedMenu === null ? (
                    <>
                        <h1>Chào mừng Sinh viên!</h1>
                        <p>Chọn một mục trong menu để bắt đầu.</p>
                    </>
                ) : (
                    renderContent()
                )}
            </div>
        </div>
    );
};

export default StudentHome;
