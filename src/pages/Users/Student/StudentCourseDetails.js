import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../service/axios_helper';
import { handleFormatDateTime } from '../../../service/handleFunc';

function StudentCourseDetails() {
    const { id } = useParams()
    const [course, setCourse] = useState({})
    const [rooms, setRooms] = useState([])
    const [assignments, setAssignments] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courseResponse, assignmentsResponse, roomsResponse] = await Promise.all([
                    axiosInstance.get(`/api/courses/${parseInt(id)}`),
                    axiosInstance.get(`/api/assignments/course/${parseInt(id)}`),
                    axiosInstance.get(`/api/rooms/course/${parseInt(id)}`)
                ])

                setCourse(courseResponse.data)
                setAssignments(assignmentsResponse.data)
                setRooms(roomsResponse.data)

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const createAttendance = async (e, roomId) => {
        e.preventDefault()
        const attendance = { roomId: roomId }
        const response = await axiosInstance.post(`/api/attendances/add`, attendance)
        return response.data
    }

    return (
        <div>
            <div>
                <h2>Tài liệu học tập</h2>
            </div>
            <div>
                <h2>Phòng học trực tuyến</h2>
                <ul>
                    {rooms.map((room) => {
                        const formattedDateTime = handleFormatDateTime(room.startTime)
                        return (
                            <li key={room.id}>
                                <label>Thời gian bắt đầu: {formattedDateTime.formattedDate}, lúc {formattedDateTime.formattedTime} {formattedDateTime.period}</label>
                                <button onClick={(e) => createAttendance(e, room.id)}>Vào phòng học</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <h2>Bài tập</h2>
                <ul>
                    {assignments.map((assignment, index) => (
                        <li key={index}>
                            <Link to={`/assignment/${assignment.id}`}>Bài tập {index + 1}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default StudentCourseDetails
