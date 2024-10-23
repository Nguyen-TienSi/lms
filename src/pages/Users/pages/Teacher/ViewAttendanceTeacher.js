import React from 'react';
import '../../styles/common.css';
import '../../styles/teacher.css';

const ViewAttendance = () => {
    // Dữ liệu giả lập cho danh sách điểm danh
    const attendanceList = [
        { id: 1, student: 'Nguyễn Văn A', status: 'Có mặt' },
        { id: 2, student: 'Trần Thị B', status: 'Vắng mặt' },
    ];

    return (
        <div className="view-attendance-container">
            <h1 className="view-attendance-title">Danh Sách Điểm Danh</h1>
            <ul className="attendance-list">
                {attendanceList.map((record) => (
                    <li key={record.id}>
                        {record.student}: {record.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewAttendance;
