import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../service/axios_helper';
import { handleFormatDateTime } from '../../../service/handleFunc';
import '../../../styles/Student/StudentAssignmentDetails.css'

function StudentAssignmentDetails() {
    const { id } = useParams();
    const [assignment, setAssignment] = useState({});
    const [submission, setSubmission] = useState({});
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
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const endDate = new Date(assignment.endDate);
        if (Object.keys(submission).length > 0 || !isNaN(endDate) && endDate < new Date()) {
            setShowButton(false);
        }
    }, [submission, assignment])

    const formatDate = (date) => {
        const { formattedDate, formattedTime, period } = handleFormatDateTime(date);
        return `${formattedDate} lúc ${formattedTime} ${period}`;
    };

    return (
        Object.keys(assignment).length === 0 ? (
            <p>Loading ...</p>
        ) : (
            <div className='student-assignment-details-container'>
                <h2>{assignment.name}</h2>
                <p>{assignment.description}</p>
                <p>
                    <strong>Ngày bắt đầu:</strong> {formatDate(assignment.startDate)}
                </p>
                <p>
                    <strong>Ngày kết thúc:</strong> {formatDate(assignment.endDate)}
                </p>
                {showButton && (
                    <Link to={`/question/assignment/${id}`} state={assignment.duration}>
                        <button>Câu hỏi trắc nghiệm</button>
                    </Link>
                )}
            </div>
        )
    );
}

export default StudentAssignmentDetails;
