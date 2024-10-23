import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/common.css';
import '../../styles/teacher.css';

const TeacherExercise = () => {
    const navigate = useNavigate();

    return (
        <div className="teacher-exercise-container">
            <h1 className="teacher-exercise-title">Bài Tập của Giáo Viên</h1>
            {/* Nội dung bài tập sẽ được hiển thị ở đây */}
            <p>Danh sách các bài tập mà bạn đã tạo sẽ hiển thị ở đây.</p>
            {/* Thêm các chức năng khác nếu cần */}
        </div>
    );
};

export default TeacherExercise;
