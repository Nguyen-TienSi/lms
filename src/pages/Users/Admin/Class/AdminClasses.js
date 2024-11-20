import React, { useState, useEffect } from 'react'
import axiosIntance from '../../../../service/axios_helper'
import { Link } from 'react-router-dom'
import '../../../../styles/Admin/AdminClasses.css'

function AdminClasses() {
    const [classes, setClasses] = useState([])
    const [newClass, setNewClass] = useState({ name: '' })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const classesResponse = await axiosIntance.get('/api/classes')
                setClasses(classesResponse.data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const classResponse = await axiosIntance.post('/api/classes/add', newClass)
            setClasses(prevClasses => {
                setNewClass({ name: '' })
                return [...prevClasses, classResponse.data];
            })
        } catch (error) {
            console.log("Error post object:", error)
        }
    }

    const deleteClass = async (id) => {
        try {
            await axiosIntance.delete(`/api/classes/delete/${id}`)
            setClasses(prevClasses => prevClasses.filter(clas => clas.id !== id))
        } catch (error) {
            console.error("Error delete object:", error)
        }
    }

    return (
        <div className='admin-classes-container'>
            <div>
                <h2>Thêm lớp học mới</h2>
                <form onSubmit={handleSubmit}>
                    <label>Tên lớp học</label>
                    <input
                        type='text'
                        name='name'
                        value={newClass.name}
                        onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                        required
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
                            <th>Mã lớp học</th>
                            <th>Tên lớp học</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((clas, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{clas.id}</td>
                                <td>{clas.name}</td>
                                <td>
                                    <Link>Chi tiết</Link>
                                    <button onClick={() => deleteClass(clas.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminClasses
