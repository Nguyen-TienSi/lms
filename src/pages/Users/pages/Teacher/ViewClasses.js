import React from 'react';
import '../../styles/common.css';
import '../../styles/teacher.css';

const ViewClasses = () => {
    // Dữ liệu giả lập cho danh sách lớp học
    const classes = [
        { id: 1, name: 'Lớp 1A' },
        { id: 2, name: 'Lớp 2B' },
        { id: 3, name: 'Lớp 3C' },
    ];

    return (
        <div className="view-classes-container">
            <h1 className="view-classes-title">Danh Sách Lớp Học</h1>
            <ul className="classes-list">
                {classes.map((classItem) => (
                    <li key={classItem.id}>{classItem.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewClasses;
