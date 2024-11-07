import React from 'react';
import '../../../../styles/ViewQuizResults.css';

const ViewQuizResults = () => {
    // Dữ liệu mẫu kết quả bài kiểm tra
    const quizResults = [
        { id: 1, name: 'Bài Kiểm Tra Toán', date: '2024-10-20', score: 85, status: 'Đạt' },
        { id: 2, name: 'Bài Kiểm Tra Lý', date: '2024-10-21', score: 72, status: 'Không đạt' },
        { id: 3, name: 'Bài Kiểm Tra Hóa', date: '2024-10-22', score: 90, status: 'Đạt' },
    ];

    return (
        <div className="view-quiz-results-container">
            <h1 className="view-quiz-results-title">Kết Quả Bài Kiểm Tra</h1>
            <table className="quiz-results-table">
                <thead>
                    <tr>
                        <th>Tên Bài Kiểm Tra</th>
                        <th>Ngày Làm</th>
                        <th>Điểm Số</th>
                        <th>Trạng Thái</th>
                    </tr>
                </thead>
                <tbody>
                    {quizResults.map((result) => (
                        <tr key={result.id}>
                            <td>{result.name}</td>
                            <td>{result.date}</td>
                            <td>{result.score}</td>
                            <td>{result.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewQuizResults;
