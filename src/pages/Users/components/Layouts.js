import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../../Admin/layout/Navbar';
import UserService from '../../../service/UserService';
import Footer from './Common/Footer';

const Layout = () => {

  return (
    <div>
      {!UserService.isAdmin() && <button onClick={async () => await UserService.logout()}>Logout</button>}
      {UserService.isAdmin() && <Navbar />}
      <Outlet />
      <Footer />
    </div>
  );
};

const ProtectedRoute = () => {
  return UserService.isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export { Layout, ProtectedRoute }
