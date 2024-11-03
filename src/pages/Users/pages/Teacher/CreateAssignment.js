import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import axios from 'axios';
import '../../styles/common.css';
import '../../styles/teacher.css';
import '../../styles/Teacher/CreateAssignment.css';

const CreateAssignment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { assignment } = location.state || {};

    const [assignmentTitle, setAssignmentTitle] = useState(assignment ? assignment.title : '');
    const [assignmentDescription, setAssignmentDescription] = useState(assignment ? assignment.description : '');
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
        const invalidFiles = selectedFiles.filter(file => !validTypes.includes(file.type));

        if (invalidFiles.length > 0) {
            setErrorMessage('Chỉ cho phép tệp hình ảnh (PNG, JPEG) và PDF.');
            setFiles([]); // Không lưu tệp không hợp lệ
        } else {
            setErrorMessage('');
            setFiles(selectedFiles);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", assignmentTitle);
        formData.append("description", assignmentDescription);

        files.forEach((file, index) => {
            formData.append(`file${index + 1}`, file);
        });

        try {
            // Gửi formData đến API
            // const response = await axios.post('http://your-api-url/assignments', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // });

            setMessage(assignment ? 'Bài tập đã được cập nhật thành công!' : 'Bài tập đã được tạo thành công!');
            setAssignmentTitle('');
            setAssignmentDescription('');
            setFiles([]);
            setTimeout(() => navigate(-1), 2000); // Điều hướng quay lại sau khi hiển thị thông báo
        } catch (error) {
            console.error("Error creating/updating assignment:", error);
            setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại!');
        }
    };

    return (
        <div>
            <Header />
            <div className='container'>
                <div className="create-assignment">
                    <div className="form-container">
                        <h1 className="create-assignment-title">{assignment ? 'Chỉnh Sửa Bài Tập' : 'Tạo Bài Tập Mới'}</h1>
                        {message && <p className="success-message">{message}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                                {files.length > 0 && (
                                    <div className="file-list">
                                        {files.map((file, index) => (
                                            <p key={index}>{file.name}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button className='btn-CA' type="submit">{assignment ? 'Cập Nhật Bài Tập' : 'Tạo Bài Tập'}</button>
                            <button type="button" className='btn-back' onClick={() => navigate(-1)}>Quay Lại</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateAssignment;
