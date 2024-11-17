import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../../service/axios_helper'

function TeacherAddNewAssignment() {
    const location = useLocation();
    const [assignment, setAssignment] = useState({
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
        setAssignment((prevAssignment) => ({
            ...prevAssignment,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const addQuestion = () => {
        setAssignment((prevAssignment) => ({
            ...prevAssignment,
            questions: [...prevAssignment.questions, { question: '', answerDtoList: [] }],
        }));
    };

    const removeQuestion = (index) => {
        const updatedQuestions = [...assignment.questions];
        updatedQuestions.splice(index, 1);
        setAssignment({ ...assignment, questions: updatedQuestions });
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...assignment.questions];
        updatedQuestions[index][field] = value;
        setAssignment({ ...assignment, questions: updatedQuestions });
    };

    const addAnswer = (questionIndex) => {
        const updatedQuestions = [...assignment.questions];
        updatedQuestions[questionIndex].answerDtoList.push({ answer: '', isCorrect: false });
        setAssignment({ ...assignment, questions: updatedQuestions });
    };

    const removeAnswer = (questionIndex, answerIndex) => {
        const updatedQuestions = [...assignment.questions];
        updatedQuestions[questionIndex].answerDtoList.splice(answerIndex, 1);
        setAssignment({ ...assignment, questions: updatedQuestions });
    };

    const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
        const updatedQuestions = [...assignment.questions];
        updatedQuestions[questionIndex].answerDtoList[answerIndex][field] = value;
        setAssignment({ ...assignment, questions: updatedQuestions });
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
                ...assignment,
                duration: `PT${assignment.duration}M`
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
        <div>
            <h2>Tạo bài tập mới</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên bài tập</label>
                    <input
                        type="text"
                        name="name"
                        value={assignment.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Mô tả bài tập</label>
                    <textarea
                        name="description"
                        value={assignment.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Ngày bắt đầu</label>
                    <input
                        type="datetime-local"
                        name="startDate"
                        value={assignment.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Ngày kết thúc</label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        value={assignment.endDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Thời lượng (phút)</label>
                    <input
                        type="number"
                        name="duration"
                        value={assignment.duration}
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
                <div>
                    <h3>Câu hỏi</h3>
                    {assignment.questions.map((question, index) => (
                        <div key={index}>
                            <label>Câu hỏi:</label>
                            <textarea
                                value={question.question}
                                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                required
                            />
                            <label>Đáp án:</label>
                            {question.answerDtoList.map((answer, answerIndex) => (
                                <div key={answerIndex}>
                                    <textarea
                                        value={answer.answer}
                                        onChange={(e) => handleAnswerChange(index, answerIndex, 'answer', e.target.value)}
                                        placeholder="Đáp án"
                                    />
                                    <input
                                        type="checkbox"
                                        checked={answer.isCorrect}
                                        onChange={(e) => handleAnswerChange(index, answerIndex, 'isCorrect', e.target.checked)}
                                    />{' '}Đúng
                                    <button type="button" onClick={() => removeAnswer(index, answerIndex)}>Xóa đáp án</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addAnswer(index)}>Thêm đáp án</button>
                            <button type="button" onClick={() => removeQuestion(index)}>Xóa câu hỏi</button>
                        </div>
                    ))}
                    <button type="button" onClick={addQuestion}>Thêm câu hỏi</button>
                </div>
                <button type="submit">Tạo bài tập</button>
            </form>
        </div>
    );
}

export default TeacherAddNewAssignment;
