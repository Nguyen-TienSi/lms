// AssignmentsList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AssignmentsList = () => {
    // Dữ liệu mẫu cho danh sách bài tập
    const [assignments, setAssignments] = useState([
        { id: 1, title: 'Bài Tập 1', description: 'Mô tả bài tập 1', dueDate: '2024-10-31' },
        { id: 2, title: 'Bài Tập 2', description: 'Mô tả bài tập 2', dueDate: '2024-11-05' },
    ]);

    const navigate = useNavigate(); // Khởi tạo useNavigate

    // Hàm điều hướng đến trang tạo bài tập
    const goToCreateAssignment = (assignment = null) => {
        if (assignment) {
            navigate('/teacherhome/name/create-assignment', { state: { assignment } });
        } else {
            navigate('/teacherhome/name/create-assignment');
        }
    };

    return (
        <div className="assignments-list">
            <h2>Bài Tập</h2>
            <ul>
                {assignments.map((assignment) => (
                    <li key={assignment.id}>
                        <h3>{assignment.title}</h3>
                        <p>{assignment.description}</p>
                        <p>Hạn Nộp: {assignment.dueDate}</p>
                        <button onClick={() => goToCreateAssignment(assignment)}>Chỉnh Sửa</button>
                    </li>
                ))}
            </ul>

            <button onClick={() => goToCreateAssignment()}>Thêm Bài Tập Mới</button>
        </div>
    );
};

export default AssignmentsList;
