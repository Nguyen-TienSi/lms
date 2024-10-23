import React, { useState } from 'react';
import '../../styles/common.css';
import '../../styles/student.css';

const SubmitAssignment = () => {
    const [assignment, setAssignment] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý nộp bài ở đây
        console.log("Submitting assignment:", assignment);
    };

    return (
        <div className="submit-assignment-container">
            <h1 className="submit-assignment-title">Nộp Bài Tập</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Bài Tập:</label>
                    <textarea 
                        value={assignment} 
                        onChange={(e) => setAssignment(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Nộp Bài</button>
            </form>
        </div>
    );
};

export default SubmitAssignment;
