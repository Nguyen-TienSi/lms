import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService'

const Login = ({setLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Khai báo điều hướng

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await UserService.login(username, password);
      if (result && UserService.isAuthenticated()) {
        setLoggedIn(UserService.isAuthenticated())
        if (UserService.isAdmin()) navigate('/admin/home');
        else if (UserService.isTeacher()) navigate('/teacher');
        else if (UserService.isStudent()) navigate('/student');
      }
    } catch (error) {
      throw error
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Đăng nhập</h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
