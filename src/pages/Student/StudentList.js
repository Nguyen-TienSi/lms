import React from 'react'
import { Link } from 'react-router-dom'

function StudentList() {
  const student = {id: 2}

  return (
    <div>
        <table>
            <thead>
                <th>STT</th>
                <th>Mã sinh viên</th>
                <th>Tên sinh viên</th>
                <th>Hành động</th>
            </thead>
            <tbody>
                <tr>
                  <td>1</td>
                  <td>234</td>
                  <td>Nguyễn Văn B</td>
                  <td>
                    <Link to={`/student/${student.id}`}>Chi tiết</Link>
                    <button>Xóa</button>
                  </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default StudentList