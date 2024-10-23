import React from 'react';
import '../../styles/common.css';
import '../../styles/teacher.css';

const ViewQuizResults = () => {
    // Dữ liệu giả lập cho kết quả trắc nghiệm
    const quizResults = [
        { id: 1, student: 'Nguyễn Văn A', score: 85 },
        { id: 2, student: 'Trần Thị B', score: 90 },
    ];

    return (
        <div className="view-quiz-results-container">
            <h1 className="view-quiz-results-title">Kết Quả Trắc Nghiệm</h1>
            <ul className="quiz-results-list">
                {quizResults.map((result) => (
                    <li key={result.id}>
                        {result.student}: {result.score} điểm
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewQuizResults;
