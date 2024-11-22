import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../service/axios_helper';
import { handleFormatDateTime, handleDownloadMaterial } from '../../../service/handleFunc';
import '../../../styles/Student/StudentCourseDetails.css'

function StudentCourseDetails() {
    const { id } = useParams()
    const [course, setCourse] = useState({})
    const [teacher, setTeacher] = useState({})
    const [materials, setMaterials] = useState([]);
    const [rooms, setRooms] = useState([])
    const [assignments, setAssignments] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courseResponse, assignmentsResponse, roomsResponse, materialsResponse] = await Promise.all([
                    axiosInstance.get(`/api/courses/${parseInt(id)}`),
                    axiosInstance.get(`/api/assignments/course/${parseInt(id)}`),
                    axiosInstance.get(`/api/rooms/course/${parseInt(id)}`),
                    axiosInstance.get(`/api/materials/course/${parseInt(id, 10)}`)
                ])

                setCourse(courseResponse.data)
                setAssignments(assignmentsResponse.data)
                setRooms(roomsResponse.data)
                setMaterials(materialsResponse.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (Object.keys(course).length !== 0) {
                    const teacherResponse = await axiosInstance.get(`/api/teachers/${course.teacherId}`)
                    setTeacher(teacherResponse.data)
                }
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
    }, [course])

    const createAttendance = async (roomId) => {
        try {
            const attendance = { roomId: roomId }
            await axiosInstance.post(`/api/attendances/add`, attendance)
        } catch (error) {
            console.error("Error post object:", error)
        }
    }

    return (
        <div>
            {Object.keys(teacher).length !== 0 ? (
                <div style={{ marginLeft: '20px' }}>
                    <h2>Thông tin giáo viên</h2>
                    <p>Giáo viên: {teacher.userDto.firstName + teacher.userDto.lastName}</p>
                    <p>Email: {teacher.userDto.username}</p>
                    <p>Số điện thoại: {teacher.userDto.phone}</p>
                </div>
            ) : (
                <div></div>
            )}
            <div className='student-course-details-container'>
                <div>
                    <h2>Tài liệu học tập</h2>
                    <ul>
                        {materials.map((material, index) => (
                            <li key={index}>
                                <p>{material.name}</p>
                                <a
                                    href={material.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                >
                                    {material.url}
                                </a>
                                <p onClick={() => handleDownloadMaterial('/api/materials/download', material)} style={{ cursor: 'pointer', color: 'blue' }}>
                                    {material.fileName}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2>Phòng học trực tuyến</h2>
                    <ul>
                        {rooms.map((room, index) => {
                            const formattedDateTime = handleFormatDateTime(room.startTime)
                            return (
                                <li key={index}>
                                    <label>Thời gian bắt đầu: {formattedDateTime.formattedDate}, lúc {formattedDateTime.formattedTime} {formattedDateTime.period}</label>
                                    <button onClick={() => createAttendance(room.id)}>Vào phòng học</button>
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
        </div>
    )
}

export default StudentCourseDetails
