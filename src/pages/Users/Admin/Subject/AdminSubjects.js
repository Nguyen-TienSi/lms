import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../../../service/axios_helper'

function AdminSubjects() {
    const [subjectData, setSubjectData] = useState([])

    useEffect(() => {
        loadSubjectData()
    }, [])

    const loadSubjectData = async () => {
        const result = await axiosInstance.get('api/subjects')
        setSubjectData(result.data)
    }

    const deleteSubject = async (id) => {
        await axiosInstance.delete(`api/subjects/delete/${id}`)
        loadSubjectData()
    }

    return (
        <div>
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
                    {subjectData.map((subject, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{subject.id}</td>
                            <td>{subject.name}</td>
                            <td>
                                <Link to={`/subject/${subject.id}`}>Chi tiết</Link>
                                <button onClick={() => deleteSubject(subject.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminSubjects
