import React from 'react'
import { Link } from 'react-router-dom'

function AdminHome() {
  return (
    <div>
      <div>
        <ul>
          <li>
            <Link>
              <p>0</p>
              <p>Khóa học</p>
            </Link>
          </li>
          <li>
            <Link>
              <p>12</p>
              <p>Lớp học trực tuyến</p>
            </Link>
          </li>
          <li>
            <Link to='/admin/teacher'>
              <p>10</p>
              <p>Giảng viên</p>
            </Link>
          </li>
          <li>
            <Link to='/admin/student'>
              <p>102</p>
              <p>Sinh viên</p>
            </Link>
          </li>
          <li>
            <Link to='/admin/subject'>
              <p>120</p>
              <p>Môn học</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminHome