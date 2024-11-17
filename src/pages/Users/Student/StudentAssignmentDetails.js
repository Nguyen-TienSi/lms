import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../service/axios_helper';

function StudentAssignmentDetails() {
    const { id } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [submission, setSubmission] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [assignmentResponse, submissionResponse] = await Promise.all([
                    axiosInstance.get(`api/assignments/${parseInt(id, 10)}`),
                    axiosInstance.get(`api/submissions/assignment/${parseInt(id, 10)}`)
                ])

                setAssignment(assignmentResponse.data)
                setSubmission(submissionResponse.data)
                
                if (submissionResponse.data) {
                    setShowButton(false)
                }
            } catch (error) {
                setError(error);
                console.error("Error fetching assignment:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { 
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div>
            <h2>{assignment.name}</h2>
            <p>{assignment.description}</p>
            <p><strong>Ngày bắt đầu:</strong> {formatDate(assignment.startDate)}</p>
            <p><strong>Ngày kết thúc:</strong> {formatDate(assignment.endDate)}</p>
            {showButton && <Link to={`/question/assignment/${id}`} state={assignment.duration}><button>Câu hỏi trắc nghiệm</button></Link>}
        </div>
    );
}

export default StudentAssignmentDetails;
