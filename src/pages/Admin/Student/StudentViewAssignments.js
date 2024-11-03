import React, { useState } from 'react';
import '../../../../styles/ViewAssignments.css'

const ViewAssignments = () => {
    // Sample data for the list of assignments
    const assignments = [
        { id: 1, title: 'Bài Tập 1', description: 'Mô tả bài tập 1', dueDate: '2024-10-31' },
        { id: 2, title: 'Bài Tập 2', description: 'Mô tả bài tập 2', dueDate: '2024-11-05' },
    ];

    // Track the file and text input for each assignment
    const [submissions, setSubmissions] = useState({});

    // Handler to capture file selection
    const handleFileChange = (e, assignmentId) => {
        setSubmissions({
            ...submissions,
            [assignmentId]: {
                ...submissions[assignmentId],
                file: e.target.files[0]
            }
        });
    };

    // Handler to capture text input
    const handleTextChange = (e, assignmentId) => {
        setSubmissions({
            ...submissions,
            [assignmentId]: {
                ...submissions[assignmentId],
                text: e.target.value
            }
        });
    };

    // Handler for "submitting" the text or file
    const handleSubmit = (e, assignmentId) => {
        e.preventDefault();

        const { text, file } = submissions[assignmentId] || {};
        console.log("Submitting for assignment:", assignmentId, { text, file });

        // Reset submission fields for this assignment
        setSubmissions((prevSubmissions) => ({
            ...prevSubmissions,
            [assignmentId]: { text: '', file: null }
        }));
    };

    return (
        <div className="view-assignments-container">
            <h1 className="view-assignments-title">Danh Sách Bài Tập Đã Giao</h1>
            <ul className="assignments-list">
                {assignments.map((assignment) => (
                    <li key={assignment.id} className="assignment-item">
                        <h2>{assignment.title}</h2>
                        <p>{assignment.description}</p>
                        <p>Hạn Nộp: {assignment.dueDate}</p>

                        {/* Submission form for each assignment */}
                        <form onSubmit={(e) => handleSubmit(e, assignment.id)}>
                            <label>Văn Bản Của Bạn:</label>
                            <textarea
                                value={submissions[assignment.id]?.text || ''}
                                onChange={(e) => handleTextChange(e, assignment.id)}
                                placeholder="Nhập văn bản của bạn tại đây..."
                            />
                            
                            <label>Hoặc Tải lên tệp:</label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, assignment.id)}
                            />
                            <button type="submit">Nộp Bài</button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewAssignments;
