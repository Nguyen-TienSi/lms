import axios from "axios";

const BASE_URL = "http://localhost:8080";

function getAuth() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return username && password ? { username, password } : null;
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const auth = getAuth();
        if (auth) {
            config.headers.Authorization = `Basic ${btoa(`${auth.username}:${auth.password}`)}`;
            if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
                config.headers['Content-Type'] = 'application/json';
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 401) {
                console.error("Unauthorized:", data);
            } else if (status >= 500) {
                console.error("Server Error:", data);
            } else {
                console.error("API Error:", data);
            }
        } else if (error.request) {
            console.error('Request failed:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
