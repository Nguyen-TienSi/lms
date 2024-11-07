import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
// import Navbar from '../../Admin/layout/Navbar';
import Navbar from '../../pages/Users/Admin/layout/Navbar';
import UserService from '../../service/UserService';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {

  return (
    <div>
      {!UserService.isAdmin() && <button onClick={async () => await UserService.logout()}>Logout</button>}
      {UserService.isAdmin() && <Navbar />}
      {UserService.isTeacher() && <Header />}
      <Outlet />
      <Footer />
    </div>
  );
};

const ProtectedRoute = () => {
  return UserService.isAuthenticated() ? <Layout /> : <Navigate to="/" replace />;
};

export default ProtectedRoute
