import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { ProtectedRoute, Layout } from './pages/Users/components/Layouts';
import UserService from './service/UserService';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          return <Route key={index} path={route.path} element={<route.component setLoggedIn={setLoggedIn} />} />;
        })}

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/* ADMIN ROUTES */}
            {UserService.isAdmin() && privateRoutes.admin.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
            {/* TEACHER ROUTES */}
            {UserService.isTeacher() && privateRoutes.teacher.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
            {/* STUDENT ROUTES */}
            {UserService.isStudent() && privateRoutes.student.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
