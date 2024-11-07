import React, { useState } from 'react';
import '../../../../styles/SubmitAssignment.css';

const SubmitAssignment = () => {
    const [assignmentTitle, setAssignmentTitle] = useState('');
    const [submissionFile, setSubmissionFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý nộp bài tập tại đây (có thể gửi dữ liệu đến server)
        if (assignmentTitle && submissionFile) {
            setMessage('Nộp bài tập thành công!');
            // Reset form
            setAssignmentTitle('');
            setSubmissionFile(null);
        } else {
            setMessage('Vui lòng điền đầy đủ thông tin!');
        }
    };

    return (
        <div className="submit-assignment-container">
            <h1 className="submit-assignment-title">Nộp Bài Tập</h1>
            <form onSubmit={handleSubmit} className="submit-assignment-form">
                <div className="form-group">
                    <label htmlFor="assignmentTitle">Tên Bài Tập:</label>
                    <input
                        type="text"
                        id="assignmentTitle"
                        value={assignmentTitle}
                        onChange={(e) => setAssignmentTitle(e.target.value)}
                        placeholder="Nhập tên bài tập..."
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="submissionFile">Tải Lên Tệp:</label>
                    <input
                        type="file"
                        id="submissionFile"
                        onChange={(e) => setSubmissionFile(e.target.files[0])}
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Nộp Bài</button>
            </form>
            {message && <p className="submit-message">{message}</p>}
        </div>
    );
};

export default SubmitAssignment;
