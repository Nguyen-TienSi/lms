import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import '../../styles/common.css';
import '../../styles/teacher.css';
import '../../styles/Teacher/CreateAssignment.css';

const CreateAssignment = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Khai báo useNavigate
    const { assignment } = location.state || {}; // Lấy dữ liệu từ state nếu có

    const [assignmentTitle, setAssignmentTitle] = useState(assignment ? assignment.title : '');
    const [assignmentDescription, setAssignmentDescription] = useState(assignment ? assignment.description : '');
    const [files, setFiles] = useState([]); // State để lưu trữ nhiều tệp
    const [message, setMessage] = useState(''); // State để lưu trữ thông báo phản hồi

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        // Xác thực loại tệp (cho phép chỉ hình ảnh và PDF)
        const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
        const invalidFiles = selectedFiles.filter(file => !validTypes.includes(file.type));

        if (invalidFiles.length > 0) {
            setMessage('Chỉ cho phép tệp hình ảnh (PNG, JPEG) và PDF.');
            setFiles([]);
        } else {
            setMessage(''); // Xóa thông báo nếu tất cả các tệp hợp lệ
            setFiles(selectedFiles);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý gửi dữ liệu như đã mô tả trước đó
        const formData = new FormData();
        formData.append("title", assignmentTitle);
        formData.append("description", assignmentDescription);

        // Append each selected file to FormData
        files.forEach((file, index) => {
            formData.append(`file${index + 1}`, file);
        });

        console.log("Creating assignment with data:", {
            title: assignmentTitle,
            description: assignmentDescription,
            files
        });

        // Reset form after submission
        setAssignmentTitle('');
        setAssignmentDescription('');
        setFiles([]);
        setMessage('Bài tập đã được tạo thành công!');

        // Logic to send `formData` to a backend server can be added here

        // Quay lại trang ClassDetail sau khi hoàn tất
        navigate(-1); // Hoặc bạn có thể chỉ định đường dẫn cụ thể
    };

    return (
        <div>
            <Header />
            <div className='container'>
                <div className="create-assignment">
                    <div className="form-container">
                        <h1 className="create-assignment-title">{assignment ? 'Chỉnh Sửa Bài Tập' : 'Tạo Bài Tập Mới'}</h1>
                        {message && <p className="feedback-message">{message}</p>}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Tiêu Đề Bài Tập:</label>
                                <input 
                                    type="text" 
                                    value={assignmentTitle} 
                                    onChange={(e) => setAssignmentTitle(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <label>Mô Tả:</label>
                                <textarea 
                                    value={assignmentDescription} 
                                    onChange={(e) => setAssignmentDescription(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <label>Upload Tệp:</label>
                                <input 
                                    type="file" 
                                    onChange={handleFileChange} 
                                    multiple 
                                />
                            </div>
                            <button className='btn-CA' type="submit">{assignment ? 'Cập Nhật Bài Tập' : 'Tạo Bài Tập'}</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateAssignment;
