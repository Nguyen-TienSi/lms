import React, { useState, useEffect } from 'react'
import axiosInstance from '../../../../service/axios_helper';
import { Link } from 'react-router-dom';

function AdminStudents() {
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        loadStudentData()
    }, [])

    const loadStudentData = async () => {
        const result = await axiosInstance.get('/api/students')
        setStudentData(result.data)
    }

    const deleteUser = async (id) => {
        await axiosInstance.delete(`/api/users/delete/${id}`)
        loadStudentData()
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã học viên</th>
                        <th>Tên học viên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Số điện thoại</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {studentData.map((student, index) => (
                        <tr key={student.userDto.id}>
                            <td>{index + 1}</td>
                            <td>{student.userDto.id}</td>
                            <td>{student.userDto.firstName} {student.userDto.lastName}</td>
                            <td>{student.userDto.gender}</td>
                            <td>{student.userDto.birthDate}</td>
                            <td>{student.userDto.phone}</td>
                            <td>
                                <Link to={`/student/${student.userDto.id}`}>Chi tiết</Link>
                                <button onClick={() => deleteUser(student.userDto.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminStudents
