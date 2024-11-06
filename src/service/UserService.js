import { useNavigate } from 'react-router-dom';
import axiosInstance from './axios_helper'

class UserService {
    static async login(username, password) {
        try {
            const result = await axiosInstance.post("/api/auth/login", { username, password })
            const { status, message, role } = result.data
            if (status === 'AUTHENTICATED') {
                localStorage.setItem('authentication', status);
                localStorage.setItem('role', role);
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
            } else {
                throw new Error(message)
            }
            return result.data
        } catch (error) {
            throw error
        }
    }

    /* AUTHENTICATION CHECKER */
    static async logout() {
        await axiosInstance.post('api/auth/logout')
        localStorage.clear()
        window.location.href = '/'
    }

    static getRole() {
        return localStorage.getItem('role')
    }

    static isAuthenticated() {
        const authentication = localStorage.getItem('authentication')
        return !!authentication
    }

    static isAdmin() {
        const role = this.getRole()
        return role && role.includes('ADMIN');
    }

    static isTeacher() {
        const role = this.getRole()
        return role && role.includes('TEACHER');
    }

    static isStudent() {
        const role = this.getRole()
        return role && role.includes('STUDENT')
    }
}

export default UserService
