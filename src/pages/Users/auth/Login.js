import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();  // Khai báo điều hướng

  const handleLogin = (e) => {
    e.preventDefault();
    if (isAdmin) {
      // Đăng nhập cho admin
      if (username === 'admin' && password === 'adminpass') {
        setLoggedIn({ role: 'admin' });
        navigate('/admin/home');  // Điều hướng đến trang admin
      } else {
        alert('Tên đăng nhập hoặc mật khẩu của admin không đúng');
      }
    } else if (username === 'teacher' && password === 'teacherpass') {
      // Đăng nhập cho giáo viên
      setLoggedIn({ role: 'teacher' });
      navigate('/teacher');  // Điều hướng đến trang giáo viên
    } else if (username === 'student' && password === 'studentpass') {
      // Đăng nhập cho học sinh
      setLoggedIn({ role: 'student' });
      navigate('/student');  // Điều hướng đến trang học sinh
    } else {
      alert('Tên đăng nhập hoặc mật khẩu không đúng');
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
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          Đăng nhập với tư cách Admin
        </label>
        <br />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
