import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../../service/axios_helper'
import '../../../../styles/Admin/AdminAddNewTeacher.css'

function AdminAddNewTeacher() {
    const [subjects, setSubjects] = useState([])
    const [selectedSubjects, setSelectedSubjects] = useState(new Set())
    const [userDto, setUserDto] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: '',
        username: '',
        phone: '',
    })
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const subjectsResponse = await axiosInstance.get('/api/subjects')
                setSubjects(subjectsResponse.data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
    }, [])

    const handleUserDtoChange = (e) => {
        const { name, value } = e.target
        setUserDto(prev => ({ ...prev, [name]: value }))
    }

    const handleSubjectChange = (subjectId) => {
        const updatedSelectedSubjects = new Set(selectedSubjects);
        if (updatedSelectedSubjects.has(subjectId)) {
            updatedSelectedSubjects.delete(subjectId);
        } else {
            updatedSelectedSubjects.add(subjectId);
        }
        setSelectedSubjects(updatedSelectedSubjects);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const subjectIds = Array.from(selectedSubjects);
            await axiosInstance.post('/api/teachers/add', { userDto: userDto, subjectIds: subjectIds });
            window.location.assign('/teacher')
        } catch (error) {
            console.error("Error post object:", error)
        }
    };

    return (
        <div className='admin-add-teacher-container'>
            <h2>Thêm giáo viên mới</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Họ</label>
                    <input
                        type='text'
                        name='firstName'
                        value={userDto.firstName}
                        onChange={handleUserDtoChange}
                        required
                    />
                </div>
                <div>
                    <label>Tên</label>
                    <input
                        type='text'
                        name='lastName'
                        value={userDto.lastName}
                        onChange={handleUserDtoChange}
                        required
                    />
                </div>
                <div>
                    <label>Giới tính</label>
                    <select name='gender' value={userDto.gender} onChange={handleUserDtoChange}>
                        <option value="">Không xác định</option>
                        <option value={true}>Nam</option>
                        <option value={false}>Nữ</option>
                    </select>
                </div>
                <div>
                    <label>Ngày sinh</label>
                    <input
                        type='date'
                        name='birthDate'
                        value={userDto.birthDate}
                        onChange={handleUserDtoChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type='email'
                        name='username'
                        value={userDto.username}
                        onChange={handleUserDtoChange}
                        required
                    />
                </div>
                <div>
                    <label>Số điện thoại</label>
                    <input
                        type='text'
                        name='phone'
                        value={userDto.phone}
                        onChange={handleUserDtoChange}
                        required
                    />
                </div>
                <div>
                    <label>Môn học</label>
                    <div className='dropdown-container'>
                        <label onClick={() => setShowDropdown(!showDropdown)}>Chọn môn học</label>
                        <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                            {subjects.map((subject) => (
                                <div key={subject.id} className="dropdown-item">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedSubjects.has(subject.id)}
                                            onChange={() => handleSubjectChange(subject.id)}
                                        />
                                        {subject.id + ' - ' + subject.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button type='submit'>Thêm</button>
            </form>
        </div>
    )
}

export default AdminAddNewTeacher
