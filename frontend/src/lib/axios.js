import axios from "axios";

export const axiosInstance = axios.create ({
    baseURL: import.meta.env.MODE === "development" ? 'http://localhost:5001/api' : "/api", // replace with your API endpoint
    withCredentials: true,  // enable cookies for cross-site requests
})