import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../../service/axios_helper'
import { handleFormatDateTime } from '../../../service/handleFunc'
import '../../../styles/Teacher/TeacherRoomDetails.css'

function TeacherRoomDetail() {
    const { id } = useParams()
    const [room, setRoom] = useState({})
    const [attendances, setAttendances] = useState([])
    const [students, setStudents] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [roomResponse, attendancesResponse] = await Promise.all([
                    axiosInstance.get(`/api/rooms/course/${parseInt(id, 10)}`),
                    axiosInstance.get(`/api/attendances/room/${parseInt(id, 10)}`)
                ])
                setRoom(roomResponse.data)
                setAttendances(attendancesResponse.data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (attendances.length > 0) {
                    const studentIds = [...new Set(attendances.map(attendance => attendance.studentId))];
                    const studentsResponse = await Promise.all(studentIds.map(studentId =>
                        axiosInstance.get(`/api/students/${studentId}`)
                    ));

                    const studentsMap = studentsResponse.reduce((acc, student, index) => {
                        acc[studentIds[index]] = student.data.userDto

                        return acc
                    }, {})
                    setStudents(studentsMap);
                }
            } catch (error) {
                console.log("Error fetching data:", error)
            }
        }
        fetchData()
    }, [attendances])

    return (
        Object.keys(students).length === 0 ? (
            <p>Danh sách đang trống</p>
        ) : (
            <div className='teacher-room-details-container'>
                <h2>Danh sách điểm danh</h2>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã sinh viên</th>
                            <th>Tên sinh viên</th>
                            <th>Ngày vào phòng</th>
                            <th>Giờ vào phòng</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendances.map((attendance, index) => {
                            const student = students[attendance.studentId];

                            const formattedAttendanceTime = handleFormatDateTime(attendance.attendanceTime);

                            const attendanceTimeMillis = new Date(attendance.attendanceTime).getTime();
                            const roomStartTimeMillis = new Date(room.startTime).getTime();
                            const timeDifferenceMinutes = Math.floor((attendanceTimeMillis - roomStartTimeMillis) / (1000 * 60));

                            const attendanceStatus = timeDifferenceMinutes > 15 ? 'Muộn' : 'Đúng giờ';
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{student.id}</td>
                                    <td>{student.firstName + ' ' + student.lastName}</td>
                                    <td>{formattedAttendanceTime.formattedDate}</td>
                                    <td>{formattedAttendanceTime.formattedTime} {formattedAttendanceTime.period}</td>
                                    <td>{attendanceStatus}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div >
        )
    )
}

export default TeacherRoomDetail
