import React from 'react';
import '../../../styles/common.css';
import '../../../styles/Student/student.css';

const ViewQuizResults = () => {
    const quizResults = [
        { id: 1, quiz: 'Kiểm Tra 1', score: 85 },
        { id: 2, quiz: 'Kiểm Tra 2', score: 90 },
    ];

    return (
        <div className="view-quiz-results-container">
            <h1 className="view-quiz-results-title">Kết Quả Bài Kiểm Tra</h1>
            <ul className="quiz-results-list">
                {quizResults.map((result) => (
                    <li key={result.id}>
                        {result.quiz}: {result.score} điểm
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewQuizResults;
