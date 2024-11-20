import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosIntance from '../../../service/axios_helper'
import '../../../styles/Teacher/TeacherAssignmentResult.css'

function TeacherAssignmentResult() {
  const { id } = useParams()
  const [assignment, setAssignment] = useState({})
  const [submissions, setSubmissions] = useState([])
  const [answers, setAnswers] = useState([])
  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignmentResponse, submissionsResponse, answersResponse] = await Promise.all([
          axiosIntance.get(`/api/assignments/${parseInt(id, 10)}`),
          axiosIntance.get(`/api/submissions/assignment/${parseInt(id, 10)}`),
          axiosIntance.get(`/api/answers/assignment/${parseInt(id, 10)}`)
        ])
        setAssignment(assignmentResponse.data)
        setSubmissions(submissionsResponse.data)
        setAnswers(answersResponse.data)
      } catch (error) {
        console.log("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (submissions.length > 0) {
          const studentIds = [...new Set(submissions.map(submission => submission.studentId))]

          const studentsResponse = await Promise.all(studentIds.map(studentId =>
            axiosIntance.get(`/api/students/${studentId}`)
          ))
          const studentsMap = studentsResponse.reduce((acc, student, index) => {
            acc[studentIds[index]] = student.data.userDto
            return acc
          }, {})

          setStudents(studentsMap)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [submissions])

  const handleCountingScore = (answerIds) => {
    let score = 0;
    const totalQuestions = new Set(answers.map(answer => answer.questionId)).size

    const answerMap = answers.reduce((map, answer) => {
      map[answer.id] = answer;
      return map;
    }, {});
    answerIds.forEach(answerId => {
      if (answerMap[answerId].isCorrect) {
        score++;
      }
    });

    return (score / totalQuestions) * 10;
  };

  return (
    submissions.length === 0 ? (
      <p>Loading ...</p>
    ) : (
      <div className='teacher-assignment-result-container'>
        <h2>Danh sách nộp bài tập</h2>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã sinh viên</th>
              <th>Tên sinh viên</th>
              <th>File</th>
              <th>Điểm số</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => {
              const student = students[submission.studentId]
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student ? student.id : 'N/A'}</td>
                  <td>{student ? student.firstName + ' ' + student.lastName : 'N/A'}</td>
                  <td>{submission.fileData}</td>
                  <td>{handleCountingScore(submission.answerIds)}</td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>
    )
  )
}

export default TeacherAssignmentResult
