import React, { useState, useEffect } from 'react'
import axiosInstance from '../../../../service/axios_helper';
import { Link } from 'react-router-dom';
import { handleFormatDateTime } from '../../../../service/handleFunc';
import '../../../../styles/Admin/AdminStudents.css'

function AdminStudents() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentsResponse = await axiosInstance.get('/api/students')
                setStudents(studentsResponse.data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
    }, [])

    const deleteUser = async (id) => {
        try {
            await axiosInstance.delete(`/api/users/delete/${id}`)
            setStudents(prevStudents => prevStudents.filter(student => student.userDto.id !== id))
        } catch (error) {
            console.error("Error delete object:", error)
        }
    }

    return (
        <div className='admin-students-container'>
            <h2>Danh sách học viên</h2>
            <Link to={'/student/add'}><button>Thêm học viên</button></Link>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã học viên</th>
                        <th>Tên học viên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => {
                        const formattedDate = handleFormatDateTime(student.userDto.birthDate).formattedDate
                        return (
                            <tr key={student.userDto.id}>
                                <td>{index + 1}</td>
                                <td>{student.userDto.id}</td>
                                <td>{student.userDto.firstName} {student.userDto.lastName}</td>
                                <td>{student.userDto.gender ? "Nam" : "Nữ"}</td>
                                <td>{formattedDate}</td>
                                <td>{student.userDto.phone}</td>
                                <td>{student.userDto.username}</td>
                                <td>
                                    <Link to={`/student/${student.userDto.id}`}>Chi tiết</Link>
                                    <button onClick={() => deleteUser(student.userDto.id)}>Xóa</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AdminStudents
