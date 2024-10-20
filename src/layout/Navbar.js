import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <div>
                <Link to='/admin/home'>
                    <h1>Hệ thống quản lý lớp học trực tuyến</h1>
                </Link>
            </div>
            <div>
                <ul>
                    <li>
                        <button>Thêm giảng viên</button>
                    </li>
                    <li>
                        <button>Thêm sinh viên</button>
                    </li>
                </ul>
            </div>

            <Outlet />
        </div>
    )
}

export default Navbar