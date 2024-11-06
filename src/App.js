import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { ProtectedRoute, Layout } from './pages/Users/components/Layouts';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          return <Route key={index} path={route.path} element={<route.component />} />;
        })}

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/* ADMIN ROUTES */}
            {privateRoutes.admin.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
            {/* TEACHER ROUTES */}
            {privateRoutes.teacher.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
            {/* STUDENT ROUTES */}
            {privateRoutes.student.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
