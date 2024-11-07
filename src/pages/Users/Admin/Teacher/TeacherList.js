import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../../service/axios_helper';

function TeacherList() {
  const [teacherData, setUserData] = useState([]);

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const result = await axiosInstance.get('/api/teachers')
    setUserData(result.data)
  }

  const deleteUser = async (id) => {
    await axiosInstance.delete(`/api/users/delete/${id}`)
    loadUser()
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
                <Link to={`/admin/teacher/${teacher.userDto.id}`}>Chi tiết</Link>
                <button onClick={() => deleteUser(teacher.userDto.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherList;
