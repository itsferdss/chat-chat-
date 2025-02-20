import axios from "axios";

export const axiosInstance = axios.create ({
    baseURL: 'http://localhost:5001/api', // replace with your API endpoint
    withCredentials: true,  // enable cookies for cross-site requests
})