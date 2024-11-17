import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosInstance from '../../../service/axios_helper'

function TeacherCourseDetails() {
    const { id } = useParams()
    const [course, setCourse] = useState({})
    const [rooms, setRooms] = useState([])
    const [assignments, setAssignments] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newRoom, setNewRoom] = useState({
        startTime: '',
        courseId: parseInt(id, 10),
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [courseResponse, assignmentsResponse, roomsResponse] = await Promise.all([
                    axiosInstance.get(`/api/courses/${parseInt(id)}`),
                    axiosInstance.get(`/api/assignments/course/${parseInt(id)}`),
                    axiosInstance.get(`/api/rooms/course/${parseInt(id)}`)
                ])

                setCourse(courseResponse.data)
                setAssignments(assignmentsResponse.data)
                setRooms(roomsResponse.data)

            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const createRoom = async (e) => {
        e.preventDefault()
        const response = await axiosInstance.post(`/api/rooms/add`, newRoom)
        return response.data
    }

    if (isLoading) {
        return <p>Loading assignments...</p>;
    }

    if (error) {
        return <p>Error loading assignments: {error.message}</p>;
    }

    return (
        <div>
            <div>
                <h2>Phòng học</h2>
                <form onSubmit={createRoom}>
                    <label>
                        Thời gian bắt đầu
                        <input
                            type='datetime-local'
                            name='startTime'
                            value={newRoom.startTime}
                            onChange={(e) => setNewRoom({ ...newRoom, startTime: e.target.value })}
                        />
                    </label>
                    <button type='submit'>Tạo phòng học mới</button>
                </form>
                {rooms.map((room, index) => (
                    <ul key={index}>
                        <Link to={`/room/${room.id}`}>Buổi học {index + 1}</Link>
                    </ul>
                ))}
            </div>
            <div>
                <h2>Bài tập</h2>
                <Link to={'/assignment/add'} state={id}><button>Tạo bài tập mới</button></Link>
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

export default TeacherCourseDetails
