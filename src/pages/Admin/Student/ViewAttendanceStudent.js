// src/pages/Users/pages/Student/ViewAttendance.js
import React, { useState } from 'react';
import '../../../../styles/ViewAttendanceStudent.css'

const ViewAttendance = () => {
    // Dữ liệu mẫu cho lịch sử điểm danh
    const attendanceRecords = [
        { id: 1, date: '2024-10-20', status: 'Có mặt' },
        { id: 2, date: '2024-10-21', status: 'Vắng mặt' },
        { id: 3, date: '2024-10-22', status: 'Có mặt' },
        { id: 4, date: '2024-10-23', status: 'Vắng mặt' },
        { id: 5, date: '2024-10-24', status: 'Có mặt' },
    ];

    const [searchDate, setSearchDate] = useState('');
    const [filteredRecords, setFilteredRecords] = useState(attendanceRecords);

    // Hàm xử lý tìm kiếm theo ngày
    const handleSearch = () => {
        const filtered = attendanceRecords.filter((record) => record.date === searchDate);
        setFilteredRecords(filtered);
    };

    return (
        <div className="view-attendance-container">
            <h1 className="view-attendance-title">Lịch Sử Điểm Danh</h1>

            {/* Form tìm kiếm theo ngày */}
            <div className="search-form">
                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Tìm Kiếm</button>
            </div>

            {/* Danh sách lịch sử điểm danh */}
            <ul className="attendance-list">
                {filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
                        <li key={record.id}>
                            Ngày: {record.date} - Trạng Thái: {record.status}
                        </li>
                    ))
                ) : (
                    <p>Không có bản ghi nào cho ngày này.</p>
                )}
            </ul>
        </div>
    );
};

export default ViewAttendance;
