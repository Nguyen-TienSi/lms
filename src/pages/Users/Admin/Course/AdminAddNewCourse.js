import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../../service/axios_helper'

function AdminAddNewCourse() {
  const [classData, setClassData] = useState([])
  const [subjectData, setSubjectData] = useState([])
  const [teacherData, setTeacherData] = useState([])
  const [semesterData, setSemesterData] = useState([])
  const [studentData, setStudentData] = useState([])
  const [course, setCourse] = useState({
    classId: '',
    subjectId: '',
    teacherId: '',
    semesterId: '',
    studentIds: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      const [classes, subjects, teachers, semesters, students] = await Promise.all([
        loadData('classes'),
        loadData('subjects'),
        loadData('teachers'),
        loadData('semesters'),
        loadData('students'),
      ]);

      const studentsByClass = {};
      students.forEach(student => {
        if (!studentsByClass[student.classId]) {
          studentsByClass[student.classId] = [];
        }
        studentsByClass[student.classId].push(student);
      });

      setClassData(classes);
      setSubjectData(subjects);
      setTeacherData(teachers);
      setSemesterData(semesters);
      setStudentData(studentsByClass);
    }

    fetchData();
  }, []);

  const loadData = async (path) => {
    const result = await axiosInstance.get(`/api/${path}`);
    return result.data;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'studentIds') {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
      setCourse(prevCourse => ({ ...prevCourse, studentIds: selectedOptions }));
    } else {
      setCourse(prevCourse => ({ ...prevCourse, [name]: parseInt(value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axiosInstance.post('api/courses/add', course)
    window.location.reload()
    console.log(course)
  }

  return (
    <div>
      <h2>Thêm khóa học mới</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Lớp học</label>
          <select name='classId' value={course.classId} onChange={handleInputChange}>
            <option value={""}>Chọn lớp học</option>
            {classData.map((eachClass, index) => (
              <option key={index} value={eachClass.id}>{eachClass.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Môn học</label>
          <select name='subjectId' value={course.subjectId} onChange={handleInputChange}>
            <option value={""}>Chọn môn học</option>
            {subjectData.map((subject, index) => (
              <option key={index} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Giáo viên</label>
          <select name='teacherId' value={course.teacherId} onChange={handleInputChange}>
            <option value={""}>Chọn giáo viên</option>
            {teacherData.map((teacher, index) => (
              <option key={index} value={teacher.userDto.id}>{teacher.userDto.firstName + " " + teacher.userDto.lastName}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Học kì</label>
          <select name='semesterId' value={course.semesterId} onChange={handleInputChange}>
            <option value={""}>Chọn học kì</option>
            {semesterData.map((semester, index) => (
              <option key={index} value={semester.id}>{semester.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Sinh viên</label>
          <select name="studentIds" multiple value={course.studentIds} onChange={handleInputChange}>
            {Object.entries(studentData).map(([classId, students]) => (
              <optgroup key={classId} label={classId}>
                {students.map(student => (
                  <option key={student.userDto.id} value={student.userDto.id}>
                    {student.userDto.id + " - " + student.userDto.firstName + " " + student.userDto.lastName}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <button type='submit'>Thêm khóa học</button>
      </form>
    </div>
  )
}

export default AdminAddNewCourse
