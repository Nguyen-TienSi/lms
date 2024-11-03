import React from 'react';
import '../../../../styles/ViewSubjects.css';

const ViewSubjects = () => {
    const subjects = [
        { id: 1, name: 'Toán Học', teacher: 'Giáo viên A', time: 'Thứ 2, 8:00 - 10:00' },
        { id: 2, name: 'Văn Học', teacher: 'Giáo viên B', time: 'Thứ 3, 10:00 - 12:00' },
        { id: 3, name: 'Tin Học', teacher: 'Giáo viên C', time: 'Thứ 5, 14:00 - 16:00' },
    ];

    return (
        <div className="view-subjects-container">
            <h1 className="view-subjects-title">Danh Sách Môn Học</h1>
            <ul className="subjects-list">
                {subjects.map((subject) => (
                    <li key={subject.id} className="subject-item">
                        <div className="subject-name">{subject.name}</div>
                        <div className="subject-details">
                            <span className="subject-teacher">{subject.teacher}</span>
                            <span className="subject-time">{subject.time}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewSubjects;
