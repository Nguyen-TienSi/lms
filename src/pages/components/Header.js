import React from 'react'
import { Link } from 'react-router-dom'
import UserService from '../../service/UserService'
import '../../styles/components/Header.css'

function Header() {
    return (
        <header>
            <div>
                <Link to='/home'>
                    <h1>Hệ thống quản lý lớp học trực tuyến</h1>
                </Link>
            </div>
            <div>
                <ul>
                    <li>
                        <button onClick={() => UserService.logout()}>Đăng xuất</button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header
