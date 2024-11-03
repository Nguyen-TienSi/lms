import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import '../../styles/Teacher/TeacherHome.css'; // Đảm bảo import CSS của bạn

const ClassList = () => {
    const [classes, setClasses] = useState([]); // Khởi tạo với mảng rỗng
    const [loading, setLoading] = useState(true); // Trạng thái tải
    const [error, setError] = useState(null); // Trạng thái lỗi

    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true); // Bắt đầu trạng thái tải
            try {
                const response = await axios.get('http://localhost:5000/classes'); // Đường dẫn API
                setClasses(response.data); // Cập nhật dữ liệu lớp học từ API
            } catch (error) {
                console.error('Error fetching classes:', error);
                setError('Không thể tải danh sách lớp học. Vui lòng thử lại sau.'); // Cập nhật thông báo lỗi
            } finally {
                setLoading(false); // Kết thúc trạng thái tải
            }
        };

        fetchClasses();
    }, []);

    return (
        <div>
            <Header />
            <div className='container'>
                <h1 className="class-list-title">Danh Sách Các Lớp Học</h1>
                {loading ? (
                    <p>Đang tải danh sách lớp học...</p> // Thông báo tải
                ) : error ? (
                    <p className="error-message">{error}</p> // Thông báo lỗi
                ) : (
                    <div className="class-grid">
                        {classes.length > 0 ? (
                            classes.map((classItem) => (
                                <Link to={`/teacherhome/${classItem.className}`} key={classItem.id} className="class-item-link">
                                <div className="class-item">
                                    {classItem.imageUrl && (
                                        <img src={classItem.imageUrl} alt={classItem.className} />
                                    )}
                                    <h2>{classItem.className}</h2>
                                    <p>Mã lớp: {classItem.classCode}</p>
                                    <p>Giáo viên: {classItem.teacher.name}</p>
                                    <p>Sinh viên: {classItem.students.join(', ')}</p>
                                    <a href={classItem.onlineLink} target="_blank" rel="noopener noreferrer">Tham Gia Lớp Học</a>
                                </div>
                            </Link>
                            ))
                        ) : (
                            <p>Không có lớp học nào được tìm thấy.</p>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ClassList;
