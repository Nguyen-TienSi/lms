import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../service/axios_helper';
import '../../../styles/Teacher/TeacherCourseDetails.css'
import { handleDownloadMaterial } from '../../../service/handleFunc'

function TeacherCourseDetails() {
    const { id } = useParams();
    const [materials, setMaterials] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [newMaterial, setNewMaterial] = useState({
        name: '',
        url: '',
        fileData: '',
        courseId: parseInt(id, 10)
    });
    const [newRoom, setNewRoom] = useState({
        startTime: '',
        courseId: parseInt(id, 10),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [assignmentsResponse, roomsResponse, materialsResponse] = await Promise.all([
                    axiosInstance.get(`/api/assignments/course/${parseInt(id)}`),
                    axiosInstance.get(`/api/rooms/course/${parseInt(id)}`),
                    axiosInstance.get(`/api/materials/course/${parseInt(id, 10)}`)
                ]);

                setAssignments(assignmentsResponse.data);
                setRooms(roomsResponse.data);
                setMaterials(materialsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const createRoom = async (e) => {
        e.preventDefault();
        const roomResponse = await axiosInstance.post(`/api/rooms/add`, newRoom);
        setRooms(prevRooms => {
            setNewRoom({ ...newRoom, startTime: '' })
            return [...prevRooms, roomResponse.data]
        })
    };

    const createMaterial = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        for (const key in newMaterial) {
            if (newMaterial.hasOwnProperty(key)) {
                formData.append(key, newMaterial[key])
            }
        }
        const materialResponse = await axiosInstance.post('/api/materials/add', formData);
        setMaterials(prevMaterials => {
            setNewMaterial({ ...newMaterial, name: '', url: '', fileData: '', })
            return [...prevMaterials, materialResponse.data]
        })
    }

    const handleMaterialInputChange = (e) => {
        const { name, value, type, files } = e.target
        setNewMaterial(prev => ({
            ...prev,
            [name]: (type === 'file') ? files[0] : value
        }))
    }

    const handleDeleteMaterials = async (id) => {
        try {
            await axiosInstance.delete(`/api/materials/delete/${id}`);
            setMaterials((prevMaterials) => prevMaterials.filter(material => material.id !== id));
        } catch (error) {
            console.error("Error delete object:", error)
        }
    }

    return (
        <div className='teacher-course-details-container'>
            <div>
                <h2>Tài liệu học tập</h2>
                <form onSubmit={createMaterial}>
                    <div>
                        <label>Tên tài liệu</label>
                        <input
                            type='text'
                            name='name'
                            value={newMaterial.name}
                            onChange={handleMaterialInputChange}
                        />
                    </div>
                    <div>
                        <label>Đường dẫn</label>
                        <input
                            type='text'
                            name='url'
                            value={newMaterial.url}
                            onChange={handleMaterialInputChange}
                        />
                    </div>
                    <div>
                        <label>Tài liệu</label>
                        <input
                            type='file'
                            name='fileData'
                            onChange={handleMaterialInputChange}
                        />
                    </div>
                    <button type='submit'>Thêm</button>
                </form>
                <ul>
                    {materials.map((material, index) => (
                        <li key={index}>
                            <p>{material.name}</p>
                            <a
                                href={material.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                            >
                                {material.url}
                            </a>
                            <p onClick={() => handleDownloadMaterial('/api/materials/download', material)} style={{ cursor: 'pointer', color: 'blue' }}>
                                {material.fileName}
                            </p>
                            <button onClick={() => handleDeleteMaterials(material.id)}>Xóa</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Phòng học</h2>
                <form onSubmit={createRoom}>
                    <label>Thời gian bắt đầu</label>
                    <input
                        type='datetime-local'
                        name='startTime'
                        value={newRoom.startTime}
                        onChange={(e) => setNewRoom({ ...newRoom, startTime: e.target.value })}
                        required
                    />
                    <button type='submit'>Tạo phòng học mới</button>
                </form>
                <ul>
                    {rooms.map((room, index) => (
                        <li key={index}><Link to={`/room/${room.id}`}>Buổi học {index + 1}</Link></li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Bài tập</h2>
                <Link to={'/assignment/add'} state={id}>
                    <button>Tạo bài tập mới</button>
                </Link>
                <ul>
                    {assignments.map((assignment, index) => (
                        <li key={index}>
                            <Link to={`/assignment/${assignment.id}`}>Bài tập {index + 1}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TeacherCourseDetails;
