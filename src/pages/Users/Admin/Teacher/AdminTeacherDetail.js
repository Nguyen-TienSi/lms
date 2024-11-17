import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosIntance from '../../../../service/axios_helper';

function AdminTeacherDetail() {
  const { id } = useParams()
  const [teacher, setTeacher] = useState({
    userDto: {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      phone: ''
    }
  })

  useEffect(() => {
    loadTeacherData()
  }, [])

  const loadTeacherData = async () => {
    const result = await axiosIntance.get(`api/teachers/${id}`)
    setTeacher(result.data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTeacher()
  }

  const handleUpdateTeacher = (e) => {

    window.location.reload()
  }

  return (
    <div>
      <h2>Chi tiết giáo viên</h2>
      <form onSubmit={handleUpdateTeacher}>
        <div>
          <label>First name</label>
          <input
            type='text'
            name='userDto.firstName'
            value={teacher.userDto.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last name</label>
          <input
            type='text'
            name='userDto.lastName'
            value={teacher.userDto.lastName}
            onChange={handleInputChange}
          />
        </div>
        {/* <div>
          <label>Giới tính</label>
          <input
            type='text'
            name='gender'
            value={teacher.userDto.gender}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Ngày sinh</label>
          <input
            type='date'
            name='birthDate'
            value={teacher.userDto.birthDate}
            onChange={handleInputChange}
          />
        </div> */}
        <div>
          <label>Số điện thoại</label>
          <input
            type='text'
            name='userDto.phone'
            value={teacher.userDto.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type='button' onClick={() => window.history.back()}>Quay lại</button>
          <button type='submit'>Cập nhật</button>
        </div>
      </form>
    </div>
  );
}

export default AdminTeacherDetail
