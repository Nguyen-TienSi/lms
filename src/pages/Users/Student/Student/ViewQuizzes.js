import React from 'react';
import '../../../../styles/ViewQuizzes.css'

const ViewQuizzes = () => {
    const quizzes = [
        { id: 1, title: 'Kiểm Tra 1', date: '2024-10-30' },
        { id: 2, title: 'Kiểm Tra 2', date: '2024-11-05' },
    ];

    return (
        <div className="view-quizzes-container">
            <h1 className="view-quizzes-title">Danh Sách Bài Kiểm Tra Trắc Nghiệm</h1>
            <ul className="quizzes-list">
                {quizzes.map((quiz) => (
                    <li key={quiz.id}>
                        <h2>{quiz.title}</h2>
                        <p>Ngày: {quiz.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewQuizzes;
