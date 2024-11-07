import React from 'react';
import '../../../styles/common.css';
import '../../../styles/Student/student.css';

const ViewSubjects = () => {
    const subjects = [
        { id: 1, name: 'Toán Học' },
        { id: 2, name: 'Văn Học' },
        { id: 3, name: 'Tin Học' },
    ];

    return (
        <div className="view-subjects-container">
            <h1 className="view-subjects-title">Danh Sách Môn Học</h1>
            <ul className="subjects-list">
                {subjects.map((subject) => (
                    <li key={subject.id}>{subject.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewSubjects;
