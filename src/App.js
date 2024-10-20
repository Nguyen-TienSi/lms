import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import TeacherList from './pages/Teacher/TeacherList';
import TeacherDetail from './pages/Teacher/TeacherDetail';
import SubjectList from './pages/Subject/SubjectList';
import SubjectDetail from './pages/Subject/SubjectDetail';
import StudentList from './pages/Student/StudentList';
import StudentDetail from './pages/Student/StudentDetail';
import Navbar from './layout/Navbar';
import NoPage from './pages/NoPage';

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
          <Route path='/*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}