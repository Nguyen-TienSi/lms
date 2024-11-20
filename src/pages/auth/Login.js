import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService'
import '../../styles/auth/Login.css'

const Login = ({setLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await UserService.login(username, password);
      if (UserService.isAuthenticated()) {
        setLoggedIn(UserService.isAuthenticated())
        navigate('/home')
      }
    } catch (error) {
      throw error
    }
  };

  return (
    <div className='login-container'>
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
