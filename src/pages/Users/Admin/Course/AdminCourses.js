import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../../service/axios_helper'
import { Link } from 'react-router-dom'

function AdminCourses() {
  const [courseData, setCourseData] = useState([])

  useEffect(() => {
    loadCourseData()
  }, [])

  const loadCourseData = async () => {
    const result = await axiosInstance.get('/api/courses')
    setCourseData(result.data)
  }

  return (
    <div>
      <Link to={'/course/add'}><button>Thêm khóa học mới</button></Link>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã khóa học</th>
            <th>Mã môn học</th>
            <th>Mã lớp học</th>
            <th>Mã giáo viên</th>
            <th>Mã học kì</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {courseData.map((course, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{course.id}</td>
              <td>{course.subjectId}</td>
              <td>{course.classId}</td>
              <td>{course.teacherId}</td>
              <td>{course.semesterId}</td>
              <td>
                <Link to={`/course/${course.id}`}>Chi tiết</Link>
                <button>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminCourses
