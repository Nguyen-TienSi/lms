import React from 'react'
import { Link } from 'react-router-dom'
import UserService from '../../service/UserService'

function Header() {
    return (
        <div>
            <div>
                <Link to='/home'>
                    <h1>Hệ thống quản lý lớp học trực tuyến</h1>
                </Link>
            </div>
            <div>
                <ul>
                    <li>
                        <button onClick={async () => await UserService.logout()}>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header
