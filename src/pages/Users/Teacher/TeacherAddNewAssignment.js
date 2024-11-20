import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../../service/axios_helper'
import '../../../styles/Teacher/TeacherAddNewAssignment.css'

function TeacherAddNewAssignment() {
    const location = useLocation();
    const [newAssignment, setNewAssignment] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        duration: "",
        file: null,
        courseId: parseInt(location.state, 10),
        questions: [],
    });

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setNewAssignment((prevAssignment) => ({
            ...prevAssignment,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const addQuestion = () => {
        setNewAssignment((prevAssignment) => ({
            ...prevAssignment,
            questions: [...prevAssignment.questions, { question: '', answerDtoList: [] }],
        }));
    };

    const removeQuestion = (index) => {
        const updatedQuestions = [...newAssignment.questions];
        updatedQuestions.splice(index, 1);
        setNewAssignment({ ...newAssignment, questions: updatedQuestions });
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...newAssignment.questions];
        updatedQuestions[index][field] = value;
        setNewAssignment({ ...newAssignment, questions: updatedQuestions });
    };

    const addAnswer = (questionIndex) => {
        const updatedQuestions = [...newAssignment.questions];
        updatedQuestions[questionIndex].answerDtoList.push({ answer: '', isCorrect: false });
        setNewAssignment({ ...newAssignment, questions: updatedQuestions });
    };

    const removeAnswer = (questionIndex, answerIndex) => {
        const updatedQuestions = [...newAssignment.questions];
        updatedQuestions[questionIndex].answerDtoList.splice(answerIndex, 1);
        setNewAssignment({ ...newAssignment, questions: updatedQuestions });
    };

    const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
        const updatedQuestions = [...newAssignment.questions];
        updatedQuestions[questionIndex].answerDtoList[answerIndex][field] = value;
        setNewAssignment({ ...newAssignment, questions: updatedQuestions });
    };

    const appendFormData = (formData, data, parentKey = '') => {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const formKey = parentKey ? `${parentKey}[${key}]` : key;

                if (typeof data[key] === 'object' && !(data[key] instanceof File)) {
                    appendFormData(formData, data[key], formKey);
                } else {
                    formData.append(formKey, data[key]);
                }
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            const formattedAssignment = {
                ...newAssignment,
                duration: `PT${newAssignment.duration}M`
            };
            appendFormData(formData, formattedAssignment)
            const response = await axiosInstance.post('/api/assignments/add', formData);
            console.log('Assignment created:', response.data);
        } catch (error) {
            console.error('Error creating assignment:', error);
            if (error.response) {
                console.error("Error:", error.response.data);
            } else {
                console.error("Network error:", error.message);
            }
        }
    };

    return (
        <div className='teacher-add-assignment-container'>
            <h2>Tạo bài tập mới</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên bài tập</label>
                    <input
                        type="text"
                        name="name"
                        value={newAssignment.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Mô tả bài tập</label>
                    <textarea
                        name="description"
                        value={newAssignment.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Ngày bắt đầu</label>
                    <input
                        type="datetime-local"
                        name="startDate"
                        value={newAssignment.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Ngày kết thúc</label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        value={newAssignment.endDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Thời lượng (phút)</label>
                    <input
                        type="number"
                        name="duration"
                        value={newAssignment.duration}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Tập tin</label>
                    <input
                        type="file"
                        name="file"
                        onChange={handleInputChange}
                        accept=".pdf"
                    />
                </div>
                <div className='question-container'>
                    <h3>Câu hỏi</h3>
                    {newAssignment.questions.map((question, index) => (
                        <div key={index}>
                            <div className='question-content'>
                                <label>Câu hỏi {index + 1}</label>
                                <textarea
                                    value={question.question}
                                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                    required
                                />
                            </div>
                            <div className='answer-content'>
                                <label>Đáp án:</label>
                                {question.answerDtoList.map((answer, answerIndex) => (
                                    <div key={answerIndex} className='answer'>
                                        <textarea
                                            value={answer.answer}
                                            onChange={(e) => handleAnswerChange(index, answerIndex, 'answer', e.target.value)}
                                            placeholder="Đáp án"
                                        />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={answer.isCorrect}
                                                onChange={(e) => handleAnswerChange(index, answerIndex, 'isCorrect', e.target.checked)}
                                            />
                                            Đúng
                                        </label>
                                        <button type="button" className="remove-answer-button" onClick={() => removeAnswer(index, answerIndex)}>Xóa đáp án</button>
                                    </div>
                                ))}
                            </div>
                            <button type="button" className="remove-question-button" onClick={() => removeQuestion(index)}>Xóa câu hỏi</button>
                            <button type="button" className="add-answer-button" onClick={() => addAnswer(index)}>Thêm đáp án</button>
                        </div>
                    ))}
                    <button type="button" className="add-question-button" onClick={addQuestion}>Thêm câu hỏi</button>
                </div>
                <button type="submit" className="submit-button">Tạo bài tập</button>
            </form>
        </div>
    );
}

export default TeacherAddNewAssignment;
