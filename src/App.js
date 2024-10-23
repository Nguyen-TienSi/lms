import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Users/auth/Login';
import Home from './pages/Admin/Home';
import TeacherList from './pages/Admin/Teacher/TeacherList';
import TeacherDetail from './pages/Admin/Teacher/TeacherDetail';
import SubjectList from './pages/Admin/Subject/SubjectList';
import SubjectDetail from './pages/Admin/Subject/SubjectDetail';
import StudentList from './pages/Admin/Student/StudentList';
import StudentDetail from './pages/Admin/Student/StudentDetail';
import Navbar from './pages/Admin/layout/Navbar';
import NoPage from './pages/Users/auth/NoPage';

// import cho sinh viên
import StudentHome from './pages/Users/pages/Student/StudentHome';
import ViewSubjects from './pages/Users/pages/Student/ViewSubjects';
import SubmitAssignment from './pages/Users/pages/Student/SubmitAssignment';
import ViewQuizzes from './pages/Users/pages/Student/ViewQuizzes';
import TakeQuiz from './pages/Users/pages/Student/TakeQuiz';
import ViewAttendanceStudent from './pages/Users/pages/Student/ViewAttendanceStudent'; 
import ViewOnlineClassStudent from './pages/Users/pages/Student/ViewOnlineClassStudent'; 
import StudentViewAssignments from './pages/Users/pages/Student/StudentViewAssignments'; 
import ViewQuizResultsStudent from './pages/Users/pages/Student/ViewQuizResultsStudent'; 

// import cho giảng viên
import TeacherExercise from './pages/Users/pages/Teacher/TeacherExercise';
import TeacherHome from './pages/Users/pages/Teacher/TeacherHome';
import ViewClasses from './pages/Users/pages/Teacher/ViewClasses'; 
import CreateOnlineClass from './pages/Users/pages/Teacher/CreateOnlineClass'; 
import ViewAttendanceTeacher from './pages/Users/pages/Teacher/ViewAttendanceTeacher'; 
import MarkAttendance from './pages/Users/pages/Teacher/MarkAttendance'; 
import CreateAssignment from './pages/Users/pages/Teacher/CreateAssignment'; 
import ViewAssignments from './pages/Users/pages/Teacher/ViewAssignments'; 
import GradeAssignments from './pages/Users/pages/Teacher/GradeAssignments'; 
import CreateQuiz from './pages/Users/pages/Teacher/CreateQuiz'; 
import ViewQuizResultsTeacher from './pages/Users/pages/Teacher/ViewQuizResultsTeacher'; 
import ViewOnlineClassTeacher from './pages/Users/pages/Teacher/ViewOnlineClassTeacher'; 

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
  <BrowserRouter>
  <Routes>
    {/* Route chính cho trang login */}
    <Route path='/' element={<Login setLoggedIn={setLoggedIn} />} />
    
    {/* Điều hướng đến /admin nếu đã đăng nhập */}
    <Route path='/admin' element={loggedIn ? <Navbar /> : <Navigate to='/' />} >
      <Route path='home' element={<Home />} />
      <Route path='teacher' element={<TeacherList />} />
      <Route path='teacher/:id' element={<TeacherDetail />} />
      <Route path='subject' element={<SubjectList />} />
      <Route path='subject/:id' element={<SubjectDetail />} />
      <Route path='student' element={<StudentList />} />
      <Route path='student/:id' element={<StudentDetail />} />
    </Route>

    {/* Routes cho giảng viên */}
    <Route path='/teacher' element={loggedIn ? <TeacherHome /> : <Navigate to='/' />} />
    <Route path='teacherhome' element={<TeacherHome />} />
    <Route path='teacherexercise' element={<TeacherExercise />} />
    <Route path='view-classes' element={<ViewClasses />} />
    <Route path='view-online-class' element={<ViewOnlineClassTeacher />} />
    <Route path='create-online-class' element={<CreateOnlineClass />} />
    <Route path='view-attendance' element={<ViewAttendanceTeacher />} />
    <Route path='mark-attendance' element={<MarkAttendance />} />
    <Route path='create-assignment' element={<CreateAssignment />} />
    <Route path='view-assignments' element={<ViewAssignments />} />
    <Route path='grade-assignments' element={<GradeAssignments />} />
    <Route path='create-quiz' element={<CreateQuiz />} />
    <Route path='view-quiz-results' element={<ViewQuizResultsTeacher />} />

    {/* Routes cho sinh viên */}
    <Route path='/student' element={loggedIn ? <StudentHome /> : <Navigate to='/' />} />
    <Route path='studenthome' element={<StudentHome />} />
    <Route path='view-subjects' element={<ViewSubjects />} />
    <Route path='view-online-class' element={<ViewOnlineClassStudent />} />
    <Route path='view-assignments' element={<StudentViewAssignments />} />
    <Route path='submit-assignment' element={<SubmitAssignment />} />
    <Route path='view-quizzes' element={<ViewQuizzes />} />
    <Route path='take-quiz' element={<TakeQuiz />} />
    <Route path='view-quiz-results' element={<ViewQuizResultsStudent />} />
    <Route path='view-attendance' element={<ViewAttendanceStudent />} />

    <Route path='/*' element={<NoPage />} />
  </Routes>
</BrowserRouter>


    </div>
  );
}
