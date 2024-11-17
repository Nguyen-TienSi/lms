import axios from "axios";

const BASE_URL = "http://localhost:8080";

function getAuth() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    //Return null if no credentials are found.  This prevents sending empty auth headers.
    return username && password ? { username, password } : null;
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, //This is generally good practice for session management
});

axiosInstance.interceptors.request.use(
    (config) => {
        const auth = getAuth();
        if (auth) {
            config.headers.Authorization = `Basic ${btoa(`${auth.username}:${auth.password}`)}`;
        }
        //More robust content-type handling
        if (config.data && typeof config.data === 'object') {
            config.headers['Content-Type'] = 'application/json';
            //For FormData, don't set Content-Type.  It's handled automatically.
        } else if (config.data instanceof FormData) {
            delete config.headers['Content-Type']; //Avoid conflicts with FormData
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor for handling errors more gracefully
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors based on status code
        if (error.response) {
            const { status, data } = error.response;
            //Example error handling (adapt to your needs)
            if (status === 401) {
                //Unauthorized - redirect to login or handle appropriately
                console.error("Unauthorized:", data);
                // Optionally: localStorage.removeItem('username'); localStorage.removeItem('password');
                // Optionally: window.location.href = '/login'; // Redirect to login page
            } else if (status >= 500) {
                //Server error
                console.error("Server Error:", data);
            } else {
                console.error("API Error:", data);
            }
        } else if (error.request) {
            //The request was made but no response was received
            console.error('Request failed:', error.request);
        } else {
            //Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
        }
        return Promise.reject(error); //Re-throw the error to be handled further up the call stack
    }
);

export default axiosInstance;
