import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosIntance from '../../../../service/axios_helper';
import '../../../../styles/Admin/AdminTeacherDetails.css'

function AdminTeacherDetail() {
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [teacher, setTeacher] = useState({
    userDto: {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      username: '',
      phone: ''
    },
    subjectIds: []
  });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teacherResponse, subjectsResponse] = await Promise.all([
          axiosIntance.get(`/api/teachers/${id}`),
          axiosIntance.get('/api/subjects')
        ]);
        setSubjects(subjectsResponse.data);
        if (teacherResponse.data) {
          const date = new Date(teacherResponse.data.userDto.birthDate);
          const formattedDate = date.toISOString().slice(0, 10);
          setTeacher({
            ...teacherResponse.data,
            userDto: {
              ...teacherResponse.data.userDto,
              birthDate: formattedDate
            }
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacher(prevTeacher => ({
      ...prevTeacher,
      userDto: { ...prevTeacher.userDto, [name]: value }
    }));
  };

  const handleSubjectChange = (subjectId) => {
    const updatedSubjectIds = [...teacher.subjectIds];
    const index = updatedSubjectIds.indexOf(subjectId);
    if (index === -1) {
      updatedSubjectIds.push(subjectId);
    } else {
      updatedSubjectIds.splice(index, 1);
    }
    setTeacher(prevTeacher => ({ ...prevTeacher, subjectIds: updatedSubjectIds }));
  };

  const handleUpdateTeacher = async () => {
    await axiosIntance.put(`/api/teachers/update/${parseInt(id, 10)}`, teacher)
    window.location.assign('/teacher')
  };

  return (
    <div className='admin-teacher-details-container'>
      <h2>Chi tiết giáo viên</h2>
      <form onSubmit={handleUpdateTeacher}>
        <div>
          <label>Họ</label>
          <input
            type='text'
            name='firstName'
            value={teacher.userDto.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Tên</label>
          <input
            type='text'
            name='lastName'
            value={teacher.userDto.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Giới tính</label>
          <select name="gender" value={teacher.userDto.gender} onChange={handleInputChange}>
            <option value={true}>Nam</option>
            <option value={false}>Nữ</option>
          </select>
        </div>
        <div>
          <label>Ngày sinh</label>
          <input
            type='date'
            name='birthDate'
            value={teacher.userDto.birthDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type='email'
            name='username'
            value={teacher.userDto.username}
            disabled
          />
        </div>
        <div>
          <label>Số điện thoại</label>
          <input
            type='text'
            name='phone'
            value={teacher.userDto.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Môn học</label>
          <div className='dropdown-container'>
            <label onClick={() => setShowDropdown(!showDropdown)}>Chọn môn học</label>
            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
              {subjects.map((subject, index) => (
                <div key={index} className="dropdown-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={teacher.subjectIds.includes(subject.id)}
                      onChange={() => handleSubjectChange(subject.id)}
                    />
                    {subject.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='button-group'>
          <button type='button' onClick={() => window.history.back()}>Quay lại</button>
          <button type='submit'>Cập nhật</button>
        </div>
      </form>
    </div>
  );
}

export default AdminTeacherDetail
