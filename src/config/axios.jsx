import axios from "axios";
const baseUrl = "http://localhost:5010";

const config = {
  baseUrl: baseUrl,
};

const api = axios.create(config);

api.defaults.baseURL = baseUrl;

// handle before call api
const handleBefore = (config) => {
  // handle hành động trước khi call API

  // lấy ra cái token và đính kèm theo cái request
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

const handleError = (error) => {
  return Promise.reject(error);
};
api.interceptors.request.use(handleBefore, null);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 errors (e.g., redirect to login)
      localStorage.removeItem("token"); // Clear the invalid token
      window.location.href = "/auth"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export const getUserProfile = () => {
  return api.get("/api/User/profile");
};

export const getTotalUsersCount = () => {
  return api.get("/api/Dashboard/userCount");
};

export const getTotalPostsCount = () => {
  return api.get("/api/Dashboard/postCount");
};

export const getTotalEarnings = () => {
  return api.get("/api/Dashboard/total-earnings");
};
export const getTotalTransactions = () => {
  return api.get("/api/Dashboard/transactionCount");
};

export const getTotalEarningsByDay = () => {
  return api.get("/api/Dashboard/total-earnings-by-day");
};

export const getRecentUsers = (count = 30) => {
  return api.get(`/api/Dashboard/recent-users?count=${count}`);
};

export const getRecentTransactions = (count = 120) => {
  return api.get(`/api/Dashboard/recent-transactions?count=${count}`);
};
export default api;
