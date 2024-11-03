import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);  // Khởi tạo là null cho đến khi đăng nhập

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page setLoggedIn={setLoggedIn} />} />;
        })}

        {privateRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                loggedIn && loggedIn.role ? (
                  <Page />
                ) : (
                  <Navigate to="/" />  // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
                )
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
