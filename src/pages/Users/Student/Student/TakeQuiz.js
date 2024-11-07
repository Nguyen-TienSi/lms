import React, { useState } from 'react';
import '../../../../styles/TakeQuiz.css'

const TakeQuiz = () => {
    // Dữ liệu giả lập cho câu hỏi trắc nghiệm
    const questions = [
        {
            question: "Câu hỏi 1: Thủ đô của Việt Nam là gì?",
            options: ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ"],
            answer: ''
        },
        {
            question: "Câu hỏi 2: Ngày quốc khánh của Việt Nam là ngày nào?",
            options: ["2/9", "30/4", "1/5", "31/12"],
            answer: ''
        },
        {
            question: "Câu hỏi 3: Môn thể thao nào được coi là vua?",
            options: ["Bóng đá", "Bóng rổ", "Bóng chuyền", "Bơi lội"],
            answer: ''
        },
    ];

    const [answers, setAnswers] = useState(Array(questions.length).fill(''));

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
            <h1 className="take-quiz-title">Làm Bài Kiểm Tra Trắc Nghiệm</h1>
            <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <div key={index} className="question-item">
                        <p>{question.question}</p>
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex}>
                                <input
                                    type="radio"
                                    name={`question${index}`}
                                    value={option}
                                    checked={answers[index] === option}
                                    onChange={() => handleAnswerChange(index, option)}
                                    required
                                />
                                <label>{option}</label>
                            </div>
                        ))}
                    </div>
                ))}
               
            </form>
            <button type="submit">Nộp Bài Kiểm Tra</button>
        </div>
    );
};

export default TakeQuiz;
