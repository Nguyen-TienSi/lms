import React from 'react'
import { Link } from 'react-router-dom'

function SubjectList() {
    const subject = { id: 2 }

    return (
        <div>
            <table>
                <thead>
                    <th>STT</th>
                    <th>Mã môn học</th>
                    <th>Tên môn học</th>
                    <th>Hành động</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>234</td>
                        <td>Lập trình hướng đối tượng</td>
                        <td>
                            <Link to={`/subject/${subject.id}`}>Chi tiết</Link>
                            <button>Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SubjectList