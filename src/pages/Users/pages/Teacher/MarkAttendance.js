import React, { useState } from 'react';
import '../../styles/common.css';
import '../../styles/teacher.css';

const MarkAttendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([
        { id: 1, name: 'Nguyễn Văn A', present: false },
        { id: 2, name: 'Trần Thị B', present: false },
    ]);

    const handleChange = (id) => {
        setAttendanceRecords(attendanceRecords.map(record => 
            record.id === id ? { ...record, present: !record.present } : record
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý điểm danh ở đây
        console.log("Attendance marked:", attendanceRecords);
    };

    return (
        <div className="mark-attendance-container">
            <h1 className="mark-attendance-title">Điểm Danh Học Sinh</h1>
            <form onSubmit={handleSubmit}>
                {attendanceRecords.map(record => (
                    <div key={record.id}>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={record.present} 
                                onChange={() => handleChange(record.id)} 
                            />
                            {record.name}
                        </label>
                    </div>
                ))}
                <button type="submit">Xác Nhận Điểm Danh</button>
            </form>
        </div>
    );
};

export default MarkAttendance;
