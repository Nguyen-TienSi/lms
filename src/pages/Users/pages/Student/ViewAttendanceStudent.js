import React from 'react';
import '../../styles/common.css';
import '../../styles/student.css';

const ViewAttendance = () => {
    const attendanceRecords = [
        { id: 1, date: '2024-10-20', status: 'Có mặt' },
        { id: 2, date: '2024-10-21', status: 'Vắng mặt' },
    ];

    return (
        <div className="view-attendance-container">
            <h1 className="view-attendance-title">Lịch Sử Điểm Danh</h1>
            <ul className="attendance-list">
                {attendanceRecords.map((record) => (
                    <li key={record.id}>
                        Ngày: {record.date} - Trạng Thái: {record.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewAttendance;
