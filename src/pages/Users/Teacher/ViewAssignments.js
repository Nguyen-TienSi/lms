import React from 'react';
import '../../styles/common.css';
import '../../styles/teacher.css';

const ViewAssignments = () => {
    // Dữ liệu giả lập cho danh sách bài tập
    const assignments = [
        { id: 1, title: 'Bài Tập 1', description: 'Mô tả bài tập 1', dueDate: '2024-10-31' },
        { id: 2, title: 'Bài Tập 2', description: 'Mô tả bài tập 2', dueDate: '2024-11-05' },
    ];

    return (
        <div className="view-assignments-container">
            <h1 className="view-assignments-title">Danh Sách Bài Tập Đã Giao</h1>
            <ul className="assignments-list">
                {assignments.map((assignment) => (
                    <li key={assignment.id}>
                        <h2>{assignment.title}</h2>
                        <p>{assignment.description}</p>
                        <p>Hạn Nộp: {assignment.dueDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewAssignments;
