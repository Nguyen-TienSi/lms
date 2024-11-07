import React, { useState } from 'react';
import '../../styles/common.css';
import '../../styles/student.css';

const TakeQuiz = () => {
    const [answers, setAnswers] = useState(['', '', '']);

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý nộp bài kiểm tra ở đây
        console.log("Submitting quiz answers:", answers);
    };

    return (
        <div className="take-quiz-container">
            <h1 className="take-quiz-title">Làm Bài Kiểm Tra</h1>
            <form onSubmit={handleSubmit}>
                {answers.map((answer, index) => (
                    <div key={index}>
                        <label>Câu hỏi {index + 1}:</label>
                        <input 
                            type="text" 
                            value={answer} 
                            onChange={(e) => handleAnswerChange(index, e.target.value)} 
                            required 
                        />
                    </div>
                ))}
                <button type="submit">Nộp Bài Kiểm Tra</button>
            </form>
        </div>
    );
};

export default TakeQuiz;
