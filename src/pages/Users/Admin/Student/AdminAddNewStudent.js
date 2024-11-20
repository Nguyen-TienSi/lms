import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../../service/axios_helper'
import '../../../../styles/Admin/AdminAddNewStudent.css'

function AdminAddNewStudent() {
    const [classes, setClasses] = useState([])
    const [classId, setClassId] = useState('')
    const [userDto, setUserDto] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: '',
        username: '',
        phone: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const classesResponse = await axiosInstance.get('/api/classes')
                setClasses(classesResponse.data)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/students/add', { userDto: userDto, classId: classId });
            window.location.assign('/student')
        } catch (error) {
            console.error("Error post object:", error)
        }
    };

    return (
        <div className='admin-add-student-container'>
            <h2>Thêm sinh viên mới</h2>
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
                    <select
                        name='gender'
                        value={userDto.gender}
                        onChange={handleUserDtoChange}
                        required
                    >
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
                    <label>Lớp</label>
                    <select onChange={(e) => setClassId(e.target.value)} value={classId} required>
                        <option value="">Chọn lớp</option>
                        {classes.map((clas, index) => (
                            <option key={index} value={clas.id}>{clas.id + ' - ' + clas.name}</option>
                        ))}
                    </select>
                </div>
                <button type='submit'>Thêm</button>
            </form>
        </div>
    )
}

export default AdminAddNewStudent
