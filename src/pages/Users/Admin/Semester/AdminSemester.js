import React, { useEffect, useState } from 'react'
import axiosIntance from '../../../../service/axios_helper'
import { handleFormatDateTime } from '../../../../service/handleFunc'
import '../../../../styles/Admin/AdminSemesters.css'

function AdminSemester() {
    const [semesters, setSemesters] = useState([])
    const [newSemester, setNewSemester] = useState({
        name: '',
        startDate: '',
        endDate: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const semestersResponse = await axiosIntance.get('/api/semesters')
                setSemesters(semestersResponse.data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewSemester(prevSemester => ({ ...prevSemester, [name]: value }))
    }

    const createSemester = async (e) => {
        e.preventDefault()
        try {
            const semesterResponse = await axiosIntance.post('/api/semesters/add', newSemester)
            setSemesters(prevSemesters => {
                setNewSemester({ name: '', startDate: '', endDate: '' })
                return [...prevSemesters, semesterResponse.data]
            })
        } catch (error) {
            console.log("Error post object:", error)
        }
    }

    const deleteSemester = async (id) => {
        try {
            await axiosIntance.delete(`/api/semesters/delete/${id}`)
            setSemesters(prevSemesters => prevSemesters.filter(semester => semester.id !== id))
        } catch (error) {
            console.error("Error delete object:", error)
        }
    }

    return (
        <div className='admin-semesters-container'>
            <div>
                <h2>Thêm học kì mới</h2>
                <form onSubmit={createSemester}>
                    <div>
                        <label>Tên học kì</label>
                        <input
                            type='text'
                            name='name'
                            value={newSemester.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Ngày bắt đầu</label>
                        <input
                            type='date'
                            name='startDate'
                            value={newSemester.startDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Ngày kết thúc</label>
                        <input
                            type='date'
                            name='endDate'
                            value={newSemester.endDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type='submit'>Thêm</button>
                </form>
            </div>
            <div>
                <h2>Danh sách học kì</h2>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã học kì</th>
                            <th>Tên học kì</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semesters.map((semester, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{semester.id}</td>
                                <td>{semester.name}</td>
                                <td>{handleFormatDateTime(semester.startDate).formattedDate}</td>
                                <td>{handleFormatDateTime(semester.endDate).formattedDate}</td>
                                <td>
                                    <button onClick={() => deleteSemester(semester.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminSemester
