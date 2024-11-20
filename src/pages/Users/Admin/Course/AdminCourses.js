import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../service/axios_helper';
import { Link } from 'react-router-dom';
import '../../../../styles/Admin/AdminCourses.css';

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await axiosInstance.get('/api/courses');
        setCourses(coursesResponse.data);

        const courseDetailsPromises = coursesResponse.data.map(async (course) => {
          try {
            const [subjectResponse, teacherResponse, classResponse, semesterResponse] = await Promise.all([
              axiosInstance.get(`/api/subjects/${course.subjectId}`),
              axiosInstance.get(`/api/teachers/${course.teacherId}`),
              axiosInstance.get(`/api/classes/${course.classId}`),
              axiosInstance.get(`/api/semesters/${course.semesterId}`)
            ]);
            return {
              courseId: course.id,
              subject: subjectResponse.data,
              teacher: teacherResponse.data,
              clas: classResponse.data,
              semester: semesterResponse.data
            };
          } catch (error) {
            console.error(`Error fetching details for course ${course.id}:`, error);
            return { courseId: course.id };
          }
        });

        const courseDetailsData = await Promise.all(courseDetailsPromises);
        const newCourseDetailsMap = new Map(courseDetailsData.map(detail => [detail.courseId, detail]));
        setCourseDetails(newCourseDetailsMap);

      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchData();
  }, []);

  const deleteCourse = async (id) => {
    try {
      await axiosInstance.delete(`/api/courses/delete/${id}`)
      setCourses(prevCourses => prevCourses.filter(prevCourse => prevCourse.id !== id))
    } catch (error) {
      console.error("Error delete object:", error)
    }
  }

  return (
    <div className='admin-courses-container'>
      <h2>Danh sách khóa học</h2>
      <Link to={'/course/add'}><button>Thêm khóa học mới</button></Link>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã khóa học</th>
            <th>Tên Môn học</th>
            <th>Tên Lớp học</th>
            <th>Tên Giáo viên</th>
            <th>Tên Học kì</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => {
            const details = courseDetails.get(course.id) || {};
            return (
              <tr key={course.id}>
                <td>{index + 1}</td>
                <td>{course.id}</td>
                <td>{details.subject?.name || 'N/A'}</td>
                <td>{details.clas?.name || 'N/A'}</td>
                <td>{details.teacher?.userDto.firstName + ' ' + details.teacher?.userDto.lastName || 'N/A'}</td>
                <td>{details.semester?.name || 'N/A'}</td>
                <td>
                  <Link to={`/course/${course.id}`}>Chi tiết</Link>
                  <button onClick={() => deleteCourse(course.id)}>Xóa</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCourses;
