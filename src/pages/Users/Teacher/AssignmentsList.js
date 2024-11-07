import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AssignmentsList = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate(); // Khởi tạo useNavigate

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/students'); // Đường dẫn API
                const students = response.data;

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

    const handleAddAssignmentClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleCreateQuiz = () => {
        console.log("Tạo bài tập trắc nghiệm");
        handleClosePopup(); // Đóng popup sau khi chọn
        // Bạn có thể thêm logic tạo bài tập trắc nghiệm ở đây
    };

    const handleCreateEssay = () => {
        navigate('/teacherhome/new/create-assignment'); // Chuyển hướng đến trang tạo bài tập tự luận
        handleClosePopup(); // Đóng popup
    };

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
            <button onClick={handleAddAssignmentClick}>Thêm Bài Tập Mới</button>
            {showPopup && (
                <AssignmentTypePopup 
                    onClose={handleClosePopup} 
                    onCreateQuiz={handleCreateQuiz} 
                    onCreateEssay={handleCreateEssay} 
                />
            )}
        </div>
    );
};

const AssignmentTypePopup = ({ onClose, onCreateQuiz, onCreateEssay }) => {
    const handleOverlayClick = (e) => {
        if (e.target.className === "popup") {
            onClose();
        }
    };

    return (
        <div className="popup" onClick={handleOverlayClick}>
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>✖</button>
                <h3>Chọn loại bài tập</h3>
                <div className='btn-assignment'>
                    <button onClick={onCreateQuiz}>Bài Tập Trắc Nghiệm</button>
                    <button onClick={onCreateEssay}>Bài Tập Tự Luận</button>
                </div>
            </div>
        </div>
    );
};

export default AssignmentsList;
