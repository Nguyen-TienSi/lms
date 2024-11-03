import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AssignmentsList = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/students'); // Đường dẫn API
                const students = response.data;

                // Lấy tất cả bài tập từ các lớp của các học sinh
                const allAssignments = students.flatMap(student =>
                    student.classes.flatMap(classItem =>
                        classItem.assignments.flatMap(assignment =>
                            assignment.tasks.map(task => ({
                                ...task,
                                className: classItem.className,
                                teacherName: classItem.teacher.name,
                            }))
                        )
                    )
                );

                setAssignments(allAssignments);
            } catch (error) {
                console.error('Error fetching assignments:', error);
                setError('Không thể lấy danh sách bài tập. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    if (loading) {
        return <p>Đang tải bài tập...</p>;
    }

    return (
        <div className="assignments-list">
            <h2>Bài Tập</h2>
            {error && <p className="error-message">{error}</p>}
            {assignments.length > 0 ? (
                <ul className="assignment-items">
                    {assignments.map((assignment) => (
                        <li key={assignment.taskId} className="assignment-item">
                            <h3>{assignment.title}</h3>
                            <p>{assignment.description}</p>
                            <p><strong>Hạn Nộp:</strong> {new Date(assignment.dueDate).toLocaleString()}</p>
                            <p><strong>Lớp:</strong> {assignment.className}</p>
                            <p><strong>Giáo viên:</strong> {assignment.teacherName}</p>
                            <Link to={`/teacherhome/${assignment.taskId}/create-assignment`}>
                                <button>Chỉnh Sửa</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Hiện tại không có bài tập nào.</p>
            )}
            <Link to="/teacherhome/new/create-assignment">
                <button>Thêm Bài Tập Mới</button>
            </Link>
        </div>
    );
};

export default AssignmentsList;
