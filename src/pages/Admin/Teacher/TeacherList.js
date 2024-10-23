import React from 'react'
import { Link } from 'react-router-dom'

function TeacherList() {
  const teacher = {id: 2}

  return (
    <div>
        <table>
            <thead>
                <th>STT</th>
                <th>Mã giảng viên</th>
                <th>Tên giảng viên</th>
                <th>Hành động</th>
            </thead>
            <tbody>
                <tr>
                  <td>1</td>
                  <td>234</td>
                  <td>Nguyễn Văn A</td>
                  <td>
                    <Link to={`/teacher/${teacher.id}`}>Chi tiết</Link>
                    <button>Xóa</button>
                  </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default TeacherList