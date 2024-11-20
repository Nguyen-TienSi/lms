import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../../service/axios_helper'
import '../../../../styles/Admin/AdminSubjects.css'
import { Link } from 'react-router-dom'

function AdminSubjects() {
    const [subjects, setSubjects] = useState([])
    const [newSubject, setNewSubject] = useState({ name: '' })

    useEffect(() => {
        const fetchData = async () => {
            const result = await axiosInstance.get('api/subjects')
            setSubjects(result.data)
        }
        fetchData()
    }, [])

    const deleteSubject = async (id) => {
        try {
            await axiosInstance.delete(`api/subjects/delete/${id}`)
            setSubjects(prevSubjects => prevSubjects.filter(subject => subject.id !== id))
        } catch (error) {
            console.error("Error delete object:", error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const subjectResponse = await axiosInstance.post(`/api/subjects/add`, newSubject)
            setSubjects(prevSubjects => {
                setNewSubject({ name: '' })
                return [...prevSubjects, subjectResponse.data]
            })
        } catch (error) {
            console.error("Error post object:", error)
        }
    }

    return (
        <div className='admin-subjects-container'>
            <div>
                <h2>Thêm môn học mới</h2>
                <form onSubmit={handleSubmit}>
                    <label>Tên môn học</label>
                    <input
                        type='text'
                        name='name'
                        value={newSubject.name}
                        onChange={(e) => setNewSubject(pre => ({ ...pre, name: e.target.value }))}
                    />
                    <button type='submit'>Thêm</button>
                </form>
            </div>
            <div>
                <h2>Danh sách lớp học</h2>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{subject.id}</td>
                                <td>{subject.name}</td>
                                <td>
                                    <Link>Chi tiết</Link>
                                    <button onClick={() => deleteSubject(subject.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminSubjects
