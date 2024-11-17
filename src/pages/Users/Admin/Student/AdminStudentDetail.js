import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosIntance from '../../../../service/axios_helper';

function AdminStudentDetail() {
  const { id } = useParams()
  const [student, setStudent] = useState({
    userDto: {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      phone: ''
    }
  })

  useEffect(() => {
    loadstudentData()
  }, [])

  const loadstudentData = async () => {
    const result = await axiosIntance.get(`api/students/${id}`)
    setStudent(result.data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setStudent()
  }

  const handleUpdatestudent = (e) => {

    window.location.reload()
  }

  return (
    <div>
      <h2>Chi tiết học viên</h2>
      <form onSubmit={handleUpdatestudent}>
        <div>
          <label>First name</label>
          <input
            type='text'
            name='firstName'
            value={student.userDto.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last name</label>
          <input
            type='text'
            name='lastName'
            value={student.userDto.lastName}
            onChange={handleInputChange}
          />
        </div>
        {/* <div>
          <label>Giới tính</label>
          <input
            type='text'
            name='gender'
            value={student.userDto.gender ? "Male" : "Female"}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Ngày sinh</label>
          <input
            type='date'
            name='birthDate'
            value={student.userDto.birthDate}
            onChange={handleInputChange}
          />
        </div> */}
        <div>
          <label>Số điện thoại</label>
          <input
            type='text'
            name='phone'
            value={student.userDto.phone}
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

export default AdminStudentDetail
