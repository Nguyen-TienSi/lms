import React, { useState } from 'react';
import '../../../styles/common.css';
import '../../../styles/Teacher/teacher.css';

const CreateQuiz = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý tạo câu hỏi trắc nghiệm ở đây
        console.log("Creating quiz question:", question, options, correctAnswer);
    };

    return (
        <div className="create-quiz-container">
            <h1 className="create-quiz-title">Tạo Câu Hỏi Trắc Nghiệm</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Câu Hỏi:</label>
                    <input 
                        type="text" 
                        value={question} 
                        onChange={(e) => setQuestion(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Đáp Án:</label>
                    {options.map((option, index) => (
                        <div key={index}>
                            <input 
                                type="text" 
                                value={option} 
                                onChange={(e) => handleOptionChange(index, e.target.value)} 
                                required 
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <label>Đáp Án Đúng:</label>
                    <input 
                        type="text" 
                        value={correctAnswer} 
                        onChange={(e) => setCorrectAnswer(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Tạo Câu Hỏi</button>
            </form>
        </div>
    );
};

export default CreateQuiz;
