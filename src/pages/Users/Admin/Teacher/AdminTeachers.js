import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../../service/axios_helper';

function AdminTeachers() {
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    loadTeacherData()
  }, [])

  const loadTeacherData = async () => {
    const result = await axiosInstance.get('/api/teachers')
    setTeacherData(result.data)
  }

  const deleteUser = async (id) => {
    await axiosInstance.delete(`/api/users/delete/${id}`)
    loadTeacherData()
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã giảng viên</th>
            <th>Tên giảng viên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Số điện thoại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {teacherData.map((teacher, index) => (
            <tr key={teacher.userDto.id}>
              <td>{index + 1}</td>
              <td>{teacher.userDto.id}</td>
              <td>{teacher.userDto.firstName} {teacher.userDto.lastName}</td>
              <td>{teacher.userDto.gender}</td>
              <td>{teacher.userDto.birthDate}</td>
              <td>{teacher.userDto.phone}</td>
              <td>
                <Link to={`/teacher/${teacher.userDto.id}`}>Chi tiết</Link>
                <button onClick={() => deleteUser(teacher.userDto.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTeachers;
