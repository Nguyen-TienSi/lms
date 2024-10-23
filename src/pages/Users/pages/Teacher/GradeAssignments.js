import React, { useState } from 'react';
import '../../styles/common.css';
import '../../styles/teacher.css';

const GradeAssignments = () => {
    const [grades, setGrades] = useState([
        { id: 1, student: 'Nguyễn Văn A', assignment: 'Bài Tập 1', score: '' },
        { id: 2, student: 'Trần Thị B', assignment: 'Bài Tập 2', score: '' },
    ]);

    const handleScoreChange = (id, value) => {
        setGrades(grades.map(grade => 
            grade.id === id ? { ...grade, score: value } : grade
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý lưu điểm ở đây
        console.log("Grading assignments:", grades);
    };

    return (
        <div className="grade-assignments-container">
            <h1 className="grade-assignments-title">Chấm Bài Tập</h1>
            <form onSubmit={handleSubmit}>
                {grades.map((grade) => (
                    <div key={grade.id}>
                        <label>
                            {grade.student} - {grade.assignment}:
                            <input 
                                type="number" 
                                value={grade.score} 
                                onChange={(e) => handleScoreChange(grade.id, e.target.value)} 
                                required 
                            />
                        </label>
                    </div>
                ))}
                <button type="submit">Lưu Điểm</button>
            </form>
        </div>
    );
};

export default GradeAssignments;
