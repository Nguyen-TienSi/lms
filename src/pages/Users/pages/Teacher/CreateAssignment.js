import React, { useState } from 'react';
import '../../styles/common.css';
import '../../styles/teacher.css';

const CreateAssignment = () => {
    const [assignmentTitle, setAssignmentTitle] = useState('');
    const [assignmentDescription, setAssignmentDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý tạo bài tập ở đây
        console.log("Creating assignment:", assignmentTitle, assignmentDescription);
    };

    return (
        <div className="create-assignment-container">
            <h1 className="create-assignment-title">Tạo Bài Tập Mới</h1>
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
                <button type="submit">Tạo Bài Tập</button>
            </form>
        </div>
    );
};

export default CreateAssignment;
