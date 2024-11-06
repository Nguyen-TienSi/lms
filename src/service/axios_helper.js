import axios from "axios";

const BASE_URL = "http://localhost:8080"

function getAuth() {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    return { username, password }
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

axiosInstance.interceptors.request.use(config => {
    const auth = getAuth()
    if (auth.username && auth.password) { 
        config.headers['Authorization'] = 'Basic ' + btoa(`${auth.username}:${auth.password}`);
    }
    return config
}, error => {
    return Promise.reject(error)
})

export default axiosInstance