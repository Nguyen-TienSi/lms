import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosIntance from '../../../../service/axios_helper';
import '../../../../styles/Admin/AdminStudentDetails.css'

function AdminStudentDetail() {
  const { id } = useParams()
  const [classes, setClasses] = useState([])
  const [student, setStudent] = useState({
    userDto: {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      username: '',
      phone: ''
    },
    classId: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentResponse, classesResponse] = await Promise.all([
          axiosIntance.get(`api/students/${id}`),
          axiosIntance.get('/api/classes')
        ])
        setClasses(classesResponse.data)
        if (studentResponse.data) {
          const date = new Date(studentResponse.data.userDto.birthDate);
          const formattedDate = date.toISOString().slice(0, 10);
          setStudent({
            ...studentResponse.data,
            userDto: {
              ...studentResponse.data.userDto,
              birthDate: formattedDate
            }
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent(prevStudent => ({
      ...prevStudent,
      userDto: {
        ...prevStudent.userDto,
        ...(name !== 'classId' ? { [name]: value } : {})
      },
      ...(name === 'classId' ? { classId: value } : {})
    }));
  };

  const handleUpdatestudent = async () => {
    try {
      await axiosIntance.put(`/api/students/update/${parseInt(id, 10)}`, student)
      window.location.assign('/student')
    } catch (error) {
      console.error("Error update object:", error)
    }
  }

  return (
    <div className='admin-student-details-container'>
      <h2>Chi tiết học viên</h2>
      <form onSubmit={handleUpdatestudent}>
        <div>
          <label>Họ</label>
          <input
            type='text'
            name='firstName'
            value={student.userDto.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Tên</label>
          <input
            type='text'
            name='lastName'
            value={student.userDto.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Giới tính</label>
          <select name="gender" value={student.userDto.gender} onChange={handleInputChange}>
            <option value={true}>Nam</option>
            <option value={false}>Nữ</option>
          </select>
        </div>
        <div>
          <label>Ngày sinh</label>
          <input
            type='date'
            name='birthDate'
            value={student.userDto.birthDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type='email'
            name='username'
            value={student.userDto.username}
            disabled
          />
        </div>
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
          <label>Lớp học</label>
          <select name='classId' value={student.classId} onChange={handleInputChange}>
            {classes.map((clas, index) => (
              <option key={index} value={clas.id}>{clas.name}</option>
            ))}
          </select>
        </div>
        <div className='button-group'>
          <button type='button' onClick={() => window.history.back()}>Quay lại</button>
          <button type='submit'>Cập nhật</button>
        </div>
      </form>
    </div>
  );
}

export default AdminStudentDetail
