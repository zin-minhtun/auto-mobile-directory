import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // API's base URL
    withCredentials: true // Include credentials (cookies) in requests
});

export default axiosInstance;