// src/components/AssignmentList.js
import React from 'react';

const AssignmentList = ({ assignments }) => {
    return (
        <div>
            <h2>Danh sách bài tập</h2>
            <ul>
                {assignments.map((assignment, index) => (
                    <li key={index}>
                        <h3>{assignment.title}</h3>
                        <p>{assignment.description}</p>
                        <p>Thời hạn: {assignment.dueDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssignmentList;
