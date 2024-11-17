import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../service/axios_helper'
import { Link } from 'react-router-dom';

function TeacherHome() {
  const [courses, setCourses] = useState([]);
  const [teacher, setTeacher] = useState({});
  const [classes, setClasses] = useState({});
  const [subjects, setSubjects] = useState({});
  const [semester, setSemester] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, teacherResponse] = await Promise.all([
          axiosInstance.get('/api/courses/user'),
          axiosInstance.get('/api/users/profile'),
        ]);

        setCourses(coursesResponse.data);
        setTeacher(teacherResponse.data);

        if (coursesResponse.data.length > 0) {
          //Use map to create an array of promises
          const classPromises = coursesResponse.data.map(course => axiosInstance.get(`/api/classes/${course.classId}`));
          const subjectPromises = coursesResponse.data.map(course => axiosInstance.get(`/api/subjects/${course.subjectId}`));
          const semesterPromise = axiosInstance.get(`/api/semesters/${coursesResponse.data[0].semesterId}`);

          const [classResults, subjectResults, semesterResult] = await Promise.all([
            Promise.all(classPromises),
            Promise.all(subjectPromises),
            semesterPromise,
          ]);

          // Create lookup objects for classes and subjects
          const classesObj = {};
          classResults.forEach(result => classesObj[result.data.id] = result.data);
          setClasses(classesObj);

          const subjectsObj = {};
          subjectResults.forEach(result => subjectsObj[result.data.id] = result.data);
          setSubjects(subjectsObj);

          setSemester(semesterResult.data);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h2>Xin chào {teacher.firstName + " " + teacher.lastName}</h2>
      </div>
      <div>
        {courses.map((course, index) => (
          <div key={index}>
            <Link to={`/course/${course.id}`}>
              <h3>[{course.id}] - {subjects[course.subjectId]?.name}</h3>
              <ul>
                <li>Lớp: {classes[course.classId]?.name}</li>
                <li>Học kỳ: {semester.name}</li>
              </ul>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeacherHome
