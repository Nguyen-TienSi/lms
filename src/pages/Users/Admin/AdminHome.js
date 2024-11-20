import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../../styles/Admin/AdminHome.css'
import axiosInstance from '../../../service/axios_helper'

function AdminHome() {
  const [courses, setCourses] = useState([])
  const [classes, setClasses] = useState([])
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [semesters, setSemesters] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          coursesResponse, classesResponse,
          teachersResponse, studentsReponse,
          subjectsResponse, semestersResponse
        ] = await Promise.all([
          axiosInstance.get('/api/courses'), axiosInstance.get('/api/classes'),
          axiosInstance.get('/api/teachers'), axiosInstance.get('/api/students'),
          axiosInstance.get('/api/subjects'), axiosInstance.get('/api/semesters'),
        ])
        setCourses(coursesResponse.data)
        setClasses(classesResponse.data)
        setTeachers(teachersResponse.data)
        setStudents(studentsReponse.data)
        setSubjects(subjectsResponse.data)
        setSemesters(semestersResponse.data)
      } catch (error) {
        console.log("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='admin-home-container'>
      <div className='admin-home-item'>
        <Link to={'/course'}>
          <p>{courses.length}</p>
          <p>Khóa học</p>
        </Link>
      </div>
      <div className='admin-home-item'>
        <Link to={'/class'}>
          <p>{classes.length}</p>
          <p>Lớp học trực tuyến</p>
        </Link>
      </div>
      <div className='admin-home-item'>
        <Link to={'/teacher'}>
          <p>{teachers.length}</p>
          <p>Giáo viên</p>
        </Link>
      </div>
      <div className='admin-home-item'>
        <Link to={'/student'}>
          <p>{students.length}</p>
          <p>Học viên</p>
        </Link>
      </div>
      <div className='admin-home-item'>
        <Link to={'/subject'}>
          <p>{subjects.length}</p>
          <p>Môn học</p>
        </Link>
      </div>
      <div className='admin-home-item'>
        <Link to={'/semester'}>
          <p>{semesters.length}</p>
          <p>Học kì</p>
        </Link>
      </div>
    </div>
  )
}

export default AdminHome
