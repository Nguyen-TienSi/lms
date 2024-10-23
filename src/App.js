import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Admin/Home';
import TeacherList from './pages/Admin/Teacher/TeacherList';
import TeacherDetail from './pages/Admin/Teacher/TeacherDetail';
import SubjectList from './pages/Admin/Subject/SubjectList';
import SubjectDetail from './pages/Admin/Subject/SubjectDetail';
import StudentList from './pages/Admin/Student/StudentList';
import StudentDetail from './pages/Admin/Student/StudentDetail';
import Navbar from './pages/Admin/layout/Navbar';
import NoPage from './pages/NoPage';
import TeacherExercise from './pages/Users/pages/Teacher/TeacherExercise';
import TeacherHome from './pages/Users/pages/Teacher/TeacherHome';
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/admin' element={loggedIn ? <Navigate to='/admin/home' /> : <Login setLoggedIn={setLoggedIn} />} />
          <Route path='/admin' element={<Navbar />}>
            <Route path='home' element={<Home />} />
            <Route path='teacher' element={<TeacherList />} />
            <Route path='teacher/:id' element={<TeacherDetail />} />
            <Route path='subject' element={<SubjectList />} />
            <Route path='subject/:id' element={<SubjectDetail />} />
            <Route path='student' element={<StudentList />} />
            <Route path='student/:id' element={<StudentDetail />} />
          </Route>
          <Route>
          {/* <Route path='/user' element={loggedIn ? <Navigate to='/user/teacherhome' /> : <Login setLoggedIn={setLoggedIn} />} /> */}
          <Route path='/user' element={<TeacherHome />} />
          <Route path='teacherhome' element={<TeacherHome />} />
          </Route>
          <Route path='/*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}