import axios from "axios";

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request interceptor for handling common request tasks
api.interceptors.request.use(
  (config) => {
    // Add authentication headers if needed
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common response tasks
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with an error status (4xx, 5xx)
      console.error("API Error:", error.response.data);

      // Handle authentication errors
      if (error.response.status === 401) {
        // Redirect to login or clear local storage
        localStorage.removeItem("authToken");
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Network Error:", error.request);
    } else {
      // Something else triggered an error
      console.error("Request Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
