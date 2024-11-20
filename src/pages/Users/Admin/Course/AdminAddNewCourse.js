import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../../service/axios_helper'
import '../../../../styles/Admin/AdminAddNewCourse.css'

function AdminAddNewCourse() {
  const [classes, setClasses] = useState([])
  const [subjects, setSubjects] = useState([])
  const [teachers, setTeachers] = useState([])
  const [semesters, setSemesters] = useState([])
  const [students, setStudents] = useState({})
  const [newCourse, setNewCourse] = useState({
    classId: '',
    subjectId: '',
    teacherId: '',
    semesterId: '',
    studentIds: new Set(),
  })
  const [selectedClass, setSelectedClass] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const studentsInSelectedClass = students[selectedClass] || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesResponse, subjectsResponse, teachersResponse, semestersResponse, studentsResponse] = await Promise.all([
          axiosInstance.get('/api/classes'),
          axiosInstance.get('/api/subjects'),
          axiosInstance.get('/api/teachers'),
          axiosInstance.get('/api/semesters'),
          axiosInstance.get('/api/students'),
        ]);

        const studentsByClass = {};
        studentsResponse.data.forEach(student => {
          studentsByClass[student.classId] = studentsByClass[student.classId] || [];
          studentsByClass[student.classId].push(student);
        });

        setClasses(classesResponse.data);
        setSubjects(subjectsResponse.data);
        setTeachers(teachersResponse.data);
        setSemesters(semestersResponse.data);
        setStudents(studentsByClass);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prevCourse => ({ ...prevCourse, [name]: parseInt(value, 10) }));
  };

  const handleStudentCheckboxChange = (studentId, checked) => {
    const newStudentIds = new Set(newCourse.studentIds);
    if (checked) {
      newStudentIds.add(studentId);
    } else {
      newStudentIds.delete(studentId);
    }
    setNewCourse(prevCourse => ({ ...prevCourse, studentIds: newStudentIds }));
  };

  const handleRemoveStudent = (studentId) => {
    const newStudentIds = new Set(newCourse.studentIds);
    newStudentIds.delete(studentId);
    setNewCourse(prevCourse => ({ ...prevCourse, studentIds: newStudentIds }));
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post('api/courses/add', { ...newCourse, studentIds: Array.from(newCourse.studentIds) });
      window.location.assign('/course')
    } catch (error) {
      console.log("Error post object:", error)
    }
  };

  const findStudentById = (studentId) => {
    for (const classId in students) {
      const classStudents = students[classId];
      const student = classStudents.find(s => s.userDto.id === studentId);
      if (student) {
        return student;
      }
    }
    return null;
  };

  return (
    <div className='admin-add-course-container'>
      <div className="form-section">
        <h2>Thêm khóa học mới</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Lớp học</label>
            <select name='classId' value={newCourse.classId} onChange={handleInputChange} required>
              <option value={""}>Chọn lớp học</option>
              {classes.map((clas, index) => (
                <option key={index} value={clas.id}>{clas.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Môn học</label>
            <select name='subjectId' value={newCourse.subjectId} onChange={handleInputChange} required>
              <option value={""}>Chọn môn học</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Giáo viên</label>
            <select name='teacherId' value={newCourse.teacherId} onChange={handleInputChange} required>
              <option value={""}>Chọn giáo viên</option>
              {teachers.map((teacher, index) => (
                <option key={index} value={teacher.userDto.id}>{teacher.userDto.firstName + " " + teacher.userDto.lastName}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Học kì</label>
            <select name='semesterId' value={newCourse.semesterId} onChange={handleInputChange} required>
              <option value={""}>Chọn học kì</option>
              {semesters.map((semester, index) => (
                <option key={index} value={semester.id}>{semester.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Học viên</label>

            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required>
              <option value={""}>Chọn lớp học</option>
              {classes.map((clas, index) => (
                <option key={index} value={clas.id}>{clas.name}</option>
              ))}
            </select>

            <div className='dropdown-container'>
              <label onClick={() => setShowDropdown(!showDropdown)}>Chọn học viên</label>
              <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                {studentsInSelectedClass.map((student, index) => (
                  <div key={index} className="dropdown-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={newCourse.studentIds.has(student.userDto.id)}
                        onChange={(e) => handleStudentCheckboxChange(student.userDto.id, e.target.checked)}
                        required
                      />
                      {student.userDto.id + ' - ' + student.userDto.firstName + ' ' + student.userDto.lastName}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button type='submit'>Thêm khóa học</button>
        </form>
      </div>

      <div className="student-list-section">
        <h3>Danh sách học viên đã chọn</h3>
        {Array.from(newCourse.studentIds).map((studentId, index) => {
          const student = findStudentById(studentId)
          return (
            <p key={index}>
              {student ? student.userDto.firstName + ' ' + student.userDto.lastName : 'Student not found'}
              <button type='button' onClick={() => handleRemoveStudent(studentId)}>X</button>
            </p>
          );
        })}
      </div>
    </div>
  )
}

export default AdminAddNewCourse
