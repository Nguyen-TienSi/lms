import React, { useState } from 'react';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);  // Thêm trạng thái để xác định có phải admin hay không

  const handleLogin = (e) => {
    e.preventDefault();  // Ngăn chặn refresh trang
    if (isAdmin) {
      // Đăng nhập cho admin
      if (username === 'admin' && password === 'adminpass') {
        setLoggedIn({ role: 'admin' });
      } else {
        alert('Tên đăng nhập hoặc mật khẩu của admin không đúng');
      }
    } else if (username === 'teacher' && password === 'teacherpass') {
      // Đăng nhập cho giáo viên
      setLoggedIn({ role: 'teacher' });
    } else if (username === 'student' && password === 'studentpass') {
      // Đăng nhập cho học sinh
      setLoggedIn({ role: 'student' });
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
            onChange={() => setIsAdmin(!isAdmin)}  // Toggle admin state
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
