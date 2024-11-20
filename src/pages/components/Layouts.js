import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserService from '../../service/UserService';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.mainContent}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const ProtectedRoute = () => {
  return UserService.isAuthenticated() ? <Layout /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainContent: {
    flex: 1,
  },
};
