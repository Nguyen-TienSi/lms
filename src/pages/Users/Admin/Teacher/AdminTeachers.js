import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../../service/axios_helper';
import { handleFormatDateTime } from '../../../../service/handleFunc';
import '../../../../styles/Admin/AdminTeachers.css'

function AdminTeachers() {
  const [teachers, setTeacher] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachersResponse = await axiosInstance.get('/api/teachers')
        setTeacher(teachersResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  const deleteUser = async (id) => {
    try {
      await axiosInstance.delete(`/api/users/delete/${id}`)
      setTeacher(prevTeachers => prevTeachers.filter(teacher => teacher.userDto.id !== id))
    } catch (error) {
      console.error("Error delete object:", error)
    }
  }

  return (
    <div className='admin-teachers-container'>
      <h2>Danh sách giáo viên</h2>
      <Link to={'/teacher/add'}><button>Thêm giáo viên</button></Link>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã giảng viên</th>
            <th>Tên giảng viên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => {
            const formattedDate = handleFormatDateTime(teacher.userDto.birthDate).formattedDate
            return (
              <tr key={teacher.userDto.id}>
                <td>{index + 1}</td>
                <td>{teacher.userDto.id}</td>
                <td>{teacher.userDto.firstName} {teacher.userDto.lastName}</td>
                <td>{teacher.userDto.gender ? "Nam" : "Nữ"}</td>
                <td>{formattedDate}</td>
                <td>{teacher.userDto.phone}</td>
                <td>{teacher.userDto.username}</td>
                <td>
                  <Link to={`/teacher/${teacher.userDto.id}`}>Chi tiết</Link>
                  <button onClick={() => deleteUser(teacher.userDto.id)}>Xóa</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTeachers;
